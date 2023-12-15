import MessageBus from "../messages/MessageBus.js";
import { ImageUpload, SceneUpload } from "../types/index.js";

class AssetsApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async uploadImages(images: ImageUpload[]): Promise<void> {
    await this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_IMAGES", { images });
  }

  async uploadScenes(scenes: SceneUpload[]): Promise<void> {
    await this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_SCENES", { scenes });
  }
}

export default AssetsApi;
