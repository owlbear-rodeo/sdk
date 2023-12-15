import { normalizeUrlObject } from "../common/normalize.js";
import MessageBus from "../messages/MessageBus.js";
import { Popover } from "../types/Popover.js";

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

  async getWidth(id: string): Promise<number | undefined> {
    const { width } = await this.messageBus.sendAsync<{
      width: number | undefined;
    }>("OBR_POPOVER_GET_WIDTH", { id });
    return width;
  }

  async setWidth(id: string, width: number): Promise<void> {
    await this.messageBus.sendAsync("OBR_POPOVER_SET_WIDTH", { id, width });
  }

  async getHeight(id: string): Promise<number | undefined> {
    const { height } = await this.messageBus.sendAsync<{
      height: number | undefined;
    }>("OBR_POPOVER_GET_HEIGHT", { id });
    return height;
  }

  async setHeight(id: string, height: number): Promise<void> {
    await this.messageBus.sendAsync("OBR_POPOVER_SET_HEIGHT", { id, height });
  }
}

export default PopoverApi;
