import { normalizeUrlObject } from "../common/normalize";
import MessageBus from "../messages/MessageBus";
import { Popover } from "../types/Popover";

class PopoverApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async open(popover: Popover): Promise<void> {
    await this.messageBus.sendAsync("OBR_POPOVER_OPEN", {
      ...normalizeUrlObject(popover),
    });
  }

  async close(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_POPOVER_CLOSE", { id });
  }
}

export default PopoverApi;
