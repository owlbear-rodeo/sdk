import PlayerApi from "./api/PlayerApi.js";
import ViewportApi from "./api/ViewportApi.js";
import MessageBus from "./messages/MessageBus.js";
import NotificationApi from "./api/NotificationApi.js";
import SceneApi from "./api/scene/SceneApi.js";
import ContextMenuApi from "./api/ContextMenuApi.js";
import ToolApi from "./api/ToolApi.js";
import PopoverApi from "./api/PopoverApi.js";
import ModalApi from "./api/ModalApi.js";
import ActionApi from "./api/ActionApi.js";
import InteractionApi from "./api/InteractionApi.js";
import PartyApi from "./api/PartyApi.js";
import RoomApi from "./api/RoomApi.js";
import ThemeApi from "./api/ThemeApi.js";
import AssetsApi from "./api/AssetsApi.js";

import { CurveBuilder } from "./builders/CurveBuilder.js";
import { ImageBuilder } from "./builders/ImageBuilder.js";
import { LabelBuilder } from "./builders/LabelBuilder.js";
import { LineBuilder } from "./builders/LineBuilder.js";
import { PointerBuilder } from "./builders/PointerBuilder.js";
import { RulerBuilder } from "./builders/RulerBuilder.js";
import { ShapeBuilder } from "./builders/ShapeBuilder.js";
import { TextBuilder } from "./builders/TextBuilder.js";
import { PathBuilder } from "./builders/PathBuilder.js";
import { ImageUploadBuilder } from "./builders/ImageUploadBuilder.js";
import { SceneUploadBuilder } from "./builders/SceneUploadBuilder.js";

import { ImageContent } from "./types/items/ImageContent.js";
import { ImageGrid } from "./types/items/ImageGrid.js";
import { getDetails } from "./common/getDetails.js";

export * from "./types/index.js";
export * from "./math/index.js";

const details = getDetails();

const messageBus = new MessageBus(details.origin, details.roomId);
const viewportApi = new ViewportApi(messageBus);
const playerApi = new PlayerApi(messageBus);
const partyApi = new PartyApi(messageBus);
const notificationApi = new NotificationApi(messageBus);
const sceneApi = new SceneApi(messageBus);
const contextMenuApi = new ContextMenuApi(messageBus);
const toolApi = new ToolApi(messageBus);
const popoverApi = new PopoverApi(messageBus);
const modalApi = new ModalApi(messageBus);
const actionApi = new ActionApi(messageBus);
const interactionApi = new InteractionApi(messageBus);
const roomApi = new RoomApi(messageBus);
const themeApi = new ThemeApi(messageBus);
const assetsApi = new AssetsApi(messageBus);

const OBR = {
  onReady: (callback: () => void) => {
    // If we're already ready then callback immediately
    if (messageBus.ready) {
      callback();
    } else {
      messageBus.once("OBR_READY", () => callback());
    }
  },
  get isReady() {
    return messageBus.ready;
  },
  viewport: viewportApi,
  player: playerApi,
  party: partyApi,
  notification: notificationApi,
  scene: sceneApi,
  contextMenu: contextMenuApi,
  tool: toolApi,
  popover: popoverApi,
  modal: modalApi,
  action: actionApi,
  interaction: interactionApi,
  room: roomApi,
  theme: themeApi,
  assets: assetsApi,
  /** True if the current site is embedded in an instance of Owlbear Rodeo */
  isAvailable: Boolean(details.origin),
};

function buildCurve() {
  return new CurveBuilder(playerApi);
}

function buildImage(image: ImageContent, grid: ImageGrid) {
  return new ImageBuilder(playerApi, image, grid);
}

function buildLabel() {
  return new LabelBuilder(playerApi);
}

function buildLine() {
  return new LineBuilder(playerApi);
}

function buildPointer() {
  return new PointerBuilder(playerApi);
}

function buildRuler() {
  return new RulerBuilder(playerApi);
}

function buildShape() {
  return new ShapeBuilder(playerApi);
}

function buildText() {
  return new TextBuilder(playerApi);
}

function buildPath() {
  return new PathBuilder(playerApi);
}

function buildImageUpload(file: File | Blob) {
  return new ImageUploadBuilder(file);
}

function buildSceneUpload() {
  return new SceneUploadBuilder();
}

export {
  buildCurve,
  buildImage,
  buildLabel,
  buildLine,
  buildPointer,
  buildRuler,
  buildShape,
  buildText,
  buildPath,
  buildImageUpload,
  buildSceneUpload,
};

export default OBR;
