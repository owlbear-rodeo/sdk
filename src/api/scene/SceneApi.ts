import MessageBus from "../../messages/MessageBus";
import SceneFogApi from "./SceneFogApi";
import SceneGridApi from "./SceneGridApi";
import SceneHistoryApi from "./SceneHistoryApi";
import SceneItemsApi from "./SceneItemsApi";

class SceneApi {
  private messageBus: MessageBus;

  grid: SceneGridApi;
  fog: SceneFogApi;
  history: SceneHistoryApi;
  items: SceneItemsApi;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
    this.grid = new SceneGridApi(messageBus);
    this.fog = new SceneFogApi(messageBus);
    this.history = new SceneHistoryApi(messageBus);
    this.items = new SceneItemsApi(messageBus);
  }

  async isReady(): Promise<boolean> {
    const { ready } = await this.messageBus.sendAsync<{ ready: boolean }>(
      "OBR_SCENE_IS_READY",
      {},
    );
    return ready;
  }
}

export default SceneApi;
