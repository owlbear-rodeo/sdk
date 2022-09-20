import MessageBus from "../../messages/MessageBus";

class SceneHistoryApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async undo(): Promise<void> {
    await this.messageBus.sendAsync("OBR_SCENE_HISTORY_UNDO", {});
  }

  async redo(): Promise<void> {
    await this.messageBus.sendAsync("OBR_SCENE_HISTORY_REDO", {});
  }

  async canUndo(): Promise<boolean> {
    const { canUndo } = await this.messageBus.sendAsync<{ canUndo: boolean }>(
      "OBR_SCENE_HISTORY_CAN_UNDO",
      {},
    );
    return canUndo;
  }

  async canRedo(): Promise<boolean> {
    const { canRedo } = await this.messageBus.sendAsync<{ canRedo: boolean }>(
      "OBR_SCENE_HISTORY_CAN_REDO",
      {},
    );
    return canRedo;
  }
}

export default SceneHistoryApi;
