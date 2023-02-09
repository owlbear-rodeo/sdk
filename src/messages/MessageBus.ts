import { isMessage } from "./Message";
import { EventEmitter } from "events";

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

  send = (id: string, data: unknown) => {
    if (!this.ref) {
      throw Error("Unable to send message: not ready");
    }
    window.top?.postMessage(
      {
        id,
        data,
        ref: this.ref,
      },
      this.targetOrigin,
    );
  };

  sendAsync = <ReturnValue>(
    id: string,
    data: unknown,
    timeout = 5000,
  ): Promise<ReturnValue> => {
    this.send(id, data);
    return Promise.race([
      new Promise<ReturnValue>((resolve, reject) => {
        const self = this;
        function onResponse(value: ReturnValue) {
          // Remove listeners for this event to avoid memory and data leaks
          self.off(`${id}_RESPONSE`, onResponse);
          self.off(`${id}_ERROR`, onError);
          resolve(value);
        }
        function onError(error: unknown) {
          self.off(`${id}_RESPONSE`, onResponse);
          self.off(`${id}_ERROR`, onError);
          reject(error);
        }
        this.on(`${id}_RESPONSE`, onResponse);
        this.on(`${id}_ERROR`, onError);
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
