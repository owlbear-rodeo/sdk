import MessageBus from "../messages/MessageBus";
import { Popover } from "../types/Popover";

class PopoverApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async open(popover: Popover): Promise<string> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_POPOVER_OPEN",
      { ...popover },
    );
    return id;
  }

  async close(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_POPOVER_CLOSE", { id });
  }
}

export default PopoverApi;
