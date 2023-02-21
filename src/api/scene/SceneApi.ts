import MessageBus from "../../messages/MessageBus";
import { Metadata } from "../../types";
import SceneFogApi from "./SceneFogApi";
import SceneGridApi from "./SceneGridApi";
import SceneHistoryApi from "./SceneHistoryApi";
import SceneItemsApi from "./SceneItemsApi";
import SceneLocalApi from "./SceneLocalApi";

class SceneApi {
  private messageBus: MessageBus;

  grid: SceneGridApi;
  fog: SceneFogApi;
  history: SceneHistoryApi;
  items: SceneItemsApi;
  local: SceneLocalApi;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
    this.grid = new SceneGridApi(messageBus);
    this.fog = new SceneFogApi(messageBus);
    this.history = new SceneHistoryApi(messageBus);
    this.items = new SceneItemsApi(messageBus);
    this.local = new SceneLocalApi(messageBus);
  }

  async isReady(): Promise<boolean> {
    const { ready } = await this.messageBus.sendAsync<{ ready: boolean }>(
      "OBR_SCENE_IS_READY",
      {},
    );
    return ready;
  }

  onReadyChange(callback: (ready: boolean) => void) {
    const handleChange = (data: { ready: boolean }) => {
      callback(data.ready);
    };
    this.messageBus.send("OBR_SCENE_READY_SUBSCRIBE", {});
    this.messageBus.on("OBR_SCENE_EVENT_READY_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_SCENE_READY_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_SCENE_EVENT_READY_CHANGE", handleChange);
    };
  }

  async getMetadata(): Promise<Metadata> {
    const { metadata } = await this.messageBus.sendAsync<{
      metadata: Metadata;
    }>("OBR_SCENE_GET_METADATA", {});
    return metadata;
  }

  async setMetadata(update: Metadata): Promise<void> {
    await this.messageBus.sendAsync("OBR_SCENE_SET_METADATA", { update });
  }

  onMetadataChange(callback: (metadata: Metadata) => void) {
    const handleChange = (data: { metadata: Metadata }) => {
      callback(data.metadata);
    };
    this.messageBus.send("OBR_SCENE_METADATA_SUBSCRIBE", {});
    this.messageBus.on("OBR_SCENE_METADATA_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_SCENE_METADATA_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_SCENE_METADATA_EVENT_CHANGE", handleChange);
    };
  }
}

export default SceneApi;
