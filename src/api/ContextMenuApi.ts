import MessageBus from "../messages/MessageBus";
import {
  ContextMenuContext,
  ContextMenuItem,
  ContextMenuState,
} from "../types/ContextMenu";

class ContextMenuApi {
  private messageBus: MessageBus;
  private contextMenus: Record<string, ContextMenuItem> = {};

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
    messageBus.on("OBR_CONTEXT_MENU_EVENT_CLICK", this.handleClick);
    messageBus.on("OBR_CONTEXT_MENU_EVENT_RENDER", this.handleRender);
    messageBus.on("OBR_CONTEXT_MENU_EVENT_SHOW", this.handleShow);
  }

  private handleClick = (event: {
    state: ContextMenuState;
    context: ContextMenuContext;
    elementId: string;
  }) => {
    const menu = this.contextMenus[event.state.id];
    if (menu) {
      menu.onClick(event.context, event.elementId);
    }
  };

  private handleRender = (event: {
    state: ContextMenuState;
    context: ContextMenuContext;
  }) => {
    const menu = this.contextMenus[event.state.id];
    if (menu) {
      const newIcon = menu.renderIcon(event.context);
      if (newIcon.svgIcon !== event.state.svgIcon) {
        this.messageBus.send("OBR_CONTEXT_MENU_SET_ICON", {
          id: event.state.id,
          svgIcon: newIcon.svgIcon,
        });
      }
      if (newIcon.label !== event.state.label) {
        this.messageBus.send("OBR_CONTEXT_MENU_SET_LABEL", {
          id: event.state.id,
          label: newIcon.label,
        });
      }
    }
  };

  private handleShow = (event: {
    state: ContextMenuState;
    context: ContextMenuContext;
  }) => {
    const menu = this.contextMenus[event.state.id];
    if (menu) {
      const show = menu.shouldShow(event.context);
      if (show !== event.state.show) {
        this.messageBus.send("OBR_CONTEXT_MENU_SET_SHOW", {
          show,
          id: event.state.id,
        });
      }
    }
  };

  async create(contextMenu: ContextMenuItem): Promise<string> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_CONTEXT_MENU_CREATE",
      { shortcut: contextMenu.shortcut },
    );

    this.contextMenus[id] = contextMenu;

    return id;
  }

  async remove(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_CONTEXT_MENU_REMOVE", { id });
    delete this.contextMenus[id];
  }
}

export default ContextMenuApi;
