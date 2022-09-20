import MessageBus from "../../messages/MessageBus";

class SceneFogApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async getColor(): Promise<string> {
    const { color } = await this.messageBus.sendAsync<{ color: string }>(
      "OBR_SCENE_FOG_GET_COLOR",
      {},
    );
    return color;
  }

  async setColor(color: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_SCENE_FOG_SET_COLOR", { color });
  }

  async getFilled(): Promise<boolean> {
    const { filled } = await this.messageBus.sendAsync<{ filled: boolean }>(
      "OBR_SCENE_FOG_GET_FILLED",
      {},
    );
    return filled;
  }

  async setFilled(filled: boolean): Promise<void> {
    await this.messageBus.sendAsync("OBR_SCENE_FOG_SET_FILLED", { filled });
  }
}

export default SceneFogApi;
