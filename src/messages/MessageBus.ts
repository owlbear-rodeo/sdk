import { isMessage } from "./Message";
import { EventEmitter } from "events";

class MessageBus extends EventEmitter {
  private targetOrigin: string;

  constructor(origin: string) {
    super();
    this.targetOrigin = origin;
    window.addEventListener("message", this.handleMessage);
    // Increase max listeners to prevent warning message from update events
    this.setMaxListeners(100);
  }

  destory() {
    window.removeEventListener("message", this.handleMessage);
  }

  private handleMessage = (event: MessageEvent<unknown>) => {
    const message = event.data;
    if (isMessage(message)) {
      this.emit(message.id, message.data);
    }
  };

  send = (id: string, data: unknown) => {
    window.top?.postMessage(
      {
        id,
        data,
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
