import { normalizeUrlObject } from "../common/normalize.js";
import MessageBus from "../messages/MessageBus.js";
import { Modal } from "../types/Modal.js";

class ModalApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async open(modal: Modal): Promise<void> {
    await this.messageBus.sendAsync("OBR_MODAL_OPEN", {
      ...normalizeUrlObject(modal),
    });
  }

  async close(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_MODAL_CLOSE", { id });
  }
}

export default ModalApi;
