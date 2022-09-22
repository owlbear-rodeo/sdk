import PlayerApi from "./api/PlayerApi";
import ViewportApi from "./api/ViewportApi";
import MessageBus from "./messages/MessageBus";
import NotificationApi from "./api/NotificationApi";
import SceneApi from "./api/scene/SceneApi";
import ContextMenuApi from "./api/ContextMenuApi";
import ToolApi from "./api/ToolApi";

import builders from "./builders";

const messageBus = new MessageBus("http://localhost:3000");

const OBR = {
  onReady: (callback: () => void) => {
    const handleReady = (data: { userId: string }) => {
      playerApi.id = data.userId;
      callback();
    };
    messageBus.on("OBR_READY", handleReady);
  },
  viewport: new ViewportApi(messageBus),
  player: new PlayerApi(messageBus),
  notification: new NotificationApi(messageBus),
  scene: new SceneApi(messageBus),
  contextMenu: new ContextMenuApi(messageBus),
  tool: new ToolApi(messageBus),
};

export { builders };

export default OBR;
