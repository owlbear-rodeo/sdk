import { isMessage } from "./Message.js";
import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";

class MessageBus extends EventEmitter {
  ready: boolean = false;
  /** The user ID of the player using this extension */
  userId: string | null = null;
  /** The ID of the room this extension is loaded in */
  roomId: string;
  /** A reference ID used to get responses from the target  */
  private ref: string | null = null;
  private targetOrigin: string;

  constructor(origin: string, roomId: string) {
    super();
    this.roomId = roomId;
    this.targetOrigin = origin;
    window.addEventListener("message", this.handleMessage);
    // Increase max listeners to prevent warning message from update events
    this.setMaxListeners(100);
  }

  destroy() {
    window.removeEventListener("message", this.handleMessage);
  }

  private handleMessage = (event: MessageEvent<unknown>) => {
    const message = event.data;
    // Ensure the message is meant for us and check that it is formatted correctly
    if (event.origin === this.targetOrigin && isMessage(message)) {
      // Handle the ready event
      if (message.id === "OBR_READY") {
        this.ready = true;
        const data = message.data as { userId: string; ref: string };
        this.ref = data.ref;
        this.userId = data.userId;
      }
      this.emit(message.id, message.data);
    }
  };

  /**
   * @param nonce
   * A nonce that will be appended to the response event ID
   * This allows concurrent calls to the same API endpoint
   * For example a call to `GET_ITEM` will respond with the `GET_ITEM_RESPONSE`
   * event. But if we make two concurrent calls to `GET_ITEM`
   * we cannot differentiate between the two `GET_ITEM_RESPONSE`
   * events. This nonce will be appended to the response so that
   * a `GET_ITEM` event called with the nonce `_123` will respond
   * with `GET_ITEM_RESPONSE_123`.
   */
  send = (id: string, data: unknown, nonce?: string) => {
    if (!this.ref) {
      throw Error("Unable to send message: not ready");
    }
    window.parent?.postMessage(
      {
        id,
        data,
        ref: this.ref,
        nonce,
      },
      this.targetOrigin,
    );
  };

  sendAsync = <ReturnValue>(
    id: string,
    data: unknown,
    timeout = 5000,
  ): Promise<ReturnValue> => {
    const nonce = `_${uuid()}`;
    this.send(id, data, nonce);
    return Promise.race([
      new Promise<ReturnValue>((resolve, reject) => {
        const self = this;
        function onResponse(value: ReturnValue) {
          // Remove listeners for this event to avoid memory and data leaks
          self.off(`${id}_RESPONSE${nonce}`, onResponse);
          self.off(`${id}_ERROR${nonce}`, onError);
          resolve(value);
        }
        function onError(error: unknown) {
          self.off(`${id}_RESPONSE${nonce}`, onResponse);
          self.off(`${id}_ERROR${nonce}`, onError);
          reject(error);
        }
        this.on(`${id}_RESPONSE${nonce}`, onResponse);
        this.on(`${id}_ERROR${nonce}`, onError);
      }),
      new Promise<ReturnValue>((_, reject) =>
        window.setTimeout(
          () =>
            reject(
              new Error(
                `Message ${id} took longer than ${timeout}ms to get a result`,
              ),
            ),
          timeout,
        ),
      ),
    ]);
  };
}

export default MessageBus;
