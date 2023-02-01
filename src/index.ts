import PlayerApi from "./api/PlayerApi";
import ViewportApi from "./api/ViewportApi";
import MessageBus from "./messages/MessageBus";
import NotificationApi from "./api/NotificationApi";
import SceneApi from "./api/scene/SceneApi";
import ContextMenuApi from "./api/ContextMenuApi";
import ToolApi from "./api/ToolApi";
import PopoverApi from "./api/PopoverApi";
import ActionApi from "./api/ActionApi";

import { CurveBuilder } from "./builders/CurveBuilder";
import { ImageBuilder } from "./builders/ImageBuilder";
import { LabelBuilder } from "./builders/LabelBuilder";
import { LineBuilder } from "./builders/LineBuilder";
import { PointerBuilder } from "./builders/PointerBuilder";
import { RulerBuilder } from "./builders/RulerBuilder";
import { ShapeBuilder } from "./builders/ShapeBuilder";
import { TextBuilder } from "./builders/TextBuilder";
import { PathBuilder } from "./builders/PathBuilder";
import { ImageContent } from "./types/items/ImageContent";
import { ImageGrid } from "./types/items/ImageGrid";
import InteractionApi from "./api/InteractionApi";
import PartyApi from "./api/PartyApi";

export * from "./types";

const urlSearchParams = new URLSearchParams(window.location.search);
const origin = urlSearchParams.get("obr_origin");

/** True if the current site is embedded in an instance of Owlbear Rodeo */
export const isAvailable = Boolean(origin);

const messageBus = new MessageBus(origin || "https://www.owlbear.app");
const viewportApi = new ViewportApi(messageBus);
const playerApi = new PlayerApi(messageBus);
const partyApi = new PartyApi(messageBus);
const notificationApi = new NotificationApi(messageBus);
const sceneApi = new SceneApi(messageBus);
const contextMenuApi = new ContextMenuApi(messageBus);
const toolApi = new ToolApi(messageBus);
const popoverApi = new PopoverApi(messageBus);
const actionApi = new ActionApi(messageBus);
const interactionApi = new InteractionApi(messageBus);

const OBR = {
  onReady: (callback: () => void) => {
    // If we're already ready then callback immediately
    if (messageBus.ready) {
      callback();
    } else {
      messageBus.once("OBR_READY", () => callback());
    }
  },
  viewport: viewportApi,
  player: playerApi,
  party: partyApi,
  notification: notificationApi,
  scene: sceneApi,
  contextMenu: contextMenuApi,
  tool: toolApi,
  popover: popoverApi,
  action: actionApi,
  interaction: interactionApi,
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
};

export default OBR;
