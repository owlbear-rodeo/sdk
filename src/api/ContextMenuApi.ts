import MessageBus from "../messages/MessageBus";
import { ContextMenuContext, ContextMenuItem } from "../types/ContextMenu";

class ContextMenuApi {
  private messageBus: MessageBus;
  private contextMenus: Record<string, ContextMenuItem> = {};

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
    messageBus.on("OBR_CONTEXT_MENU_EVENT_CLICK", this.handleClick);
  }

  private handleClick = (event: {
    id: string;
    context: ContextMenuContext;
    elementId: string;
  }) => {
    const menu = this.contextMenus[event.id];
    if (menu) {
      menu.onClick(event.context, event.elementId);
    }
  };

  async create(contextMenu: ContextMenuItem): Promise<void> {
    this.messageBus.sendAsync("OBR_CONTEXT_MENU_CREATE", {
      id: contextMenu.id,
      shortcut: contextMenu.shortcut,
      icons: contextMenu.icons,
    });

    this.contextMenus[contextMenu.id] = contextMenu;
  }

  async remove(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_CONTEXT_MENU_REMOVE", { id });
    delete this.contextMenus[id];
  }
}

export default ContextMenuApi;
