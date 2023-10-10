import PlayerApi from "./api/PlayerApi";
import ViewportApi from "./api/ViewportApi";
import MessageBus from "./messages/MessageBus";
import NotificationApi from "./api/NotificationApi";
import SceneApi from "./api/scene/SceneApi";
import ContextMenuApi from "./api/ContextMenuApi";
import ToolApi from "./api/ToolApi";
import PopoverApi from "./api/PopoverApi";
import ModalApi from "./api/ModalApi";
import ActionApi from "./api/ActionApi";
import InteractionApi from "./api/InteractionApi";
import PartyApi from "./api/PartyApi";
import RoomApi from "./api/RoomApi";
import ThemeApi from "./api/ThemeApi";
import AssetsApi from "./api/AssetsApi";

import { CurveBuilder } from "./builders/CurveBuilder";
import { ImageBuilder } from "./builders/ImageBuilder";
import { LabelBuilder } from "./builders/LabelBuilder";
import { LineBuilder } from "./builders/LineBuilder";
import { PointerBuilder } from "./builders/PointerBuilder";
import { RulerBuilder } from "./builders/RulerBuilder";
import { ShapeBuilder } from "./builders/ShapeBuilder";
import { TextBuilder } from "./builders/TextBuilder";
import { PathBuilder } from "./builders/PathBuilder";
import { ImageUploadBuilder } from "./builders/ImageUploadBuilder";
import { SceneUploadBuilder } from "./builders/SceneUploadBuilder";

import { ImageContent } from "./types/items/ImageContent";
import { ImageGrid } from "./types/items/ImageGrid";
import { getDetails } from "./common/getDetails";

export * from "./types";
export * from "./math";

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

function buildImageUpload(file: File) {
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
