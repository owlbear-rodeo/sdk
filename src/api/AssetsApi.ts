import MessageBus from "../messages/MessageBus";
import {
  ImageAssetType,
  ImageDownload,
  ImageUpload,
  SceneDownload,
  SceneUpload,
} from "../types";

class AssetsApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async uploadImages(
    images: ImageUpload[],
    typeHint?: ImageAssetType,
  ): Promise<void> {
    await this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_IMAGES", {
      images,
      typeHint,
    });
  }

  async uploadScenes(
    scenes: SceneUpload[],
    disableShowScenes?: boolean,
  ): Promise<void> {
    await this.messageBus.sendAsync("OBR_ASSETS_UPLOAD_SCENES", {
      scenes,
      disableShowScenes,
    });
  }

  async downloadImages(
    multiple?: boolean,
    defaultSearch?: string,
    typeHint?: ImageAssetType,
  ): Promise<ImageDownload[]> {
    const { images } = await this.messageBus.sendAsync<{
      images: ImageDownload[];
    }>("OBR_ASSETS_DOWNLOAD_IMAGES", { multiple, defaultSearch, typeHint }, -1);
    return images;
  }

  async downloadScenes(
    multiple?: boolean,
    defaultSearch?: string,
  ): Promise<SceneDownload[]> {
    const { scenes } = await this.messageBus.sendAsync<{
      scenes: SceneDownload[];
    }>("OBR_ASSETS_DOWNLOAD_SCENES", { multiple, defaultSearch }, -1);
    return scenes;
  }
}

export default AssetsApi;
