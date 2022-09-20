import MessageBus from "../../messages/MessageBus";
import SceneItemsLocalApi from "./SceneItemsLocalApi";
import SceneItemsSharedApi from "./SceneItemsSharedApi";

class SceneItemsApi {
  private messageBus: MessageBus;

  shared: SceneItemsSharedApi;
  local: SceneItemsLocalApi;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
    this.shared = new SceneItemsSharedApi(messageBus);
    this.local = new SceneItemsLocalApi(messageBus);
  }
}

export default SceneItemsApi;
