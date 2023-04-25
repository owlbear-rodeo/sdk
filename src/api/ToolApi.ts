import { normalizeIconPaths } from "../common/normalize";
import MessageBus from "../messages/MessageBus";
import { Metadata } from "../types";
import {
  KeyEvent,
  Tool,
  ToolAction,
  ToolContext,
  ToolEvent,
  ToolMode,
} from "../types/Tool";

class ToolApi {
  private messageBus: MessageBus;
  private tools: Record<string, Tool> = {};
  private toolActions: Record<string, ToolAction> = {};
  private toolModes: Record<string, ToolMode> = {};

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
    messageBus.on("OBR_TOOL_EVENT_CLICK", this.handleToolClick);

    messageBus.on("OBR_TOOL_ACTION_EVENT_CLICK", this.handleToolActionClick);

    messageBus.on("OBR_TOOL_MODE_EVENT_CLICK", this.handleToolModeClick);
    messageBus.on(
      "OBR_TOOL_MODE_EVENT_TOOL_CLICK",
      this.handleToolModeToolClick,
    );
    messageBus.on(
      "OBR_TOOL_MODE_EVENT_TOOL_DOUBLE_CLICK",
      this.handleToolModeToolDoubleClick,
    );
    messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_DOWN", this.handleToolModeToolDown);
    messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_MOVE", this.handleToolModeToolMove);
    messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_UP", this.handleToolModeToolUp);
    messageBus.on(
      "OBR_TOOL_MODE_EVENT_TOOL_DRAG_START",
      this.handleToolModeToolDragStart,
    );
    messageBus.on(
      "OBR_TOOL_MODE_EVENT_TOOL_DRAG_MOVE",
      this.handleToolModeToolDragMove,
    );
    messageBus.on(
      "OBR_TOOL_MODE_EVENT_TOOL_DRAG_END",
      this.handleToolModeToolDragEnd,
    );
    messageBus.on(
      "OBR_TOOL_MODE_EVENT_TOOL_DRAG_CANCEL",
      this.handleToolModeToolDragCancel,
    );
    messageBus.on("OBR_TOOL_MODE_EVENT_KEY_DOWN", this.handleToolModeKeyDown);
    messageBus.on("OBR_TOOL_MODE_EVENT_KEY_UP", this.handleToolModeKeyUp);
  }

  private handleToolClick = (event: {
    id: string;
    context: ToolContext;
    elementId: string;
  }) => {
    const tool = this.tools[event.id];
    if (tool) {
      if (tool.onClick) {
        const result = tool.onClick(event.context, event.elementId);
        Promise.resolve(result).then((activate) => {
          if (activate) {
            this.messageBus.send("OBR_TOOL_ACTIVATE", {
              id: event.id,
            });
          }
        });
      } else {
        this.messageBus.send("OBR_TOOL_ACTIVATE", {
          id: event.id,
        });
      }
    }
  };

  private handleToolActionClick = (event: {
    id: string;
    context: ToolContext;
    elementId: string;
  }) => {
    const action = this.toolActions[event.id];
    if (action) {
      action.onClick?.(event.context, event.elementId);
    }
  };

  private handleToolModeClick = (event: {
    id: string;
    context: ToolContext;
    elementId: string;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      if (mode.onClick) {
        const result = mode.onClick(event.context, event.elementId);
        Promise.resolve(result).then((activate) => {
          if (activate) {
            this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
              toolId: event.context.activeTool,
              modeId: event.id,
            });
          }
        });
      } else {
        this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
          toolId: event.context.activeTool,
          modeId: event.id,
        });
      }
    }
  };

  private handleToolModeToolClick = (event: {
    id: string;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      if (mode.onToolClick) {
        const result = mode.onToolClick(event.context, event.event);
        Promise.resolve(result).then((select) => {
          if (select && event.event.target && !event.event.target.locked) {
            this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
              items: [event.event.target.id],
            });
          }
        });
      } else {
        if (event.event.target && !event.event.target.locked) {
          this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
            items: [event.event.target.id],
          });
        }
      }
    }
  };

  private handleToolModeToolDoubleClick = (event: {
    id: string;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      if (mode.onToolDoubleClick) {
        const result = mode.onToolDoubleClick(event.context, event.event);
        Promise.resolve(result).then((select) => {
          if (select && event.event.target) {
            this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
              items: [event.event.target.id],
            });
          }
        });
      } else {
        if (event.event.target) {
          this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
            items: [event.event.target.id],
          });
        }
      }
    }
  };

  private handleToolModeToolDown = (event: {
    id: string;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      mode.onToolDown?.(event.context, event.event);
    }
  };

  private handleToolModeToolMove = (event: {
    id: string;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      mode.onToolMove?.(event.context, event.event);
    }
  };

  private handleToolModeToolUp = (event: {
    id: string;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      mode.onToolUp?.(event.context, event.event);
    }
  };

  private handleToolModeToolDragStart = (event: {
    id: string;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      mode.onToolDragStart?.(event.context, event.event);
    }
  };

  private handleToolModeToolDragMove = (event: {
    id: string;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      mode.onToolDragMove?.(event.context, event.event);
    }
  };

  private handleToolModeToolDragEnd = (event: {
    id: string;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      mode.onToolDragEnd?.(event.context, event.event);
    }
  };

  private handleToolModeToolDragCancel = (event: {
    id: string;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      mode.onToolDragCancel?.(event.context, event.event);
    }
  };

  private handleToolModeKeyDown = (event: {
    id: string;
    context: ToolContext;
    event: KeyEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      mode.onKeyDown?.(event.context, event.event);
    }
  };

  private handleToolModeKeyUp = (event: {
    id: string;
    context: ToolContext;
    event: KeyEvent;
  }) => {
    const mode = this.toolModes[event.id];
    if (mode) {
      mode.onKeyUp?.(event.context, event.event);
    }
  };

  async create(tool: Tool): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_CREATE", {
      id: tool.id,
      shortcut: tool.shortcut,
      defaultMode: tool.defaultMode,
      defaultMetadata: tool.defaultMetadata,
      icons: normalizeIconPaths(tool.icons),
      disabled: tool.disabled,
    });

    this.tools[tool.id] = tool;
  }

  async remove(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_REMOVE", { id });
    delete this.tools[id];
  }

  async activateTool(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_ACTIVATE", { id });
  }

  async getMetadata(id: string): Promise<Metadata | undefined> {
    const { metadata } = await this.messageBus.sendAsync<{
      metadata?: Metadata;
    }>("OBR_TOOL_GET_METADATA", { id });
    return metadata;
  }

  async setMetadata(toolId: string, update: Partial<Metadata>): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_SET_METADATA", {
      toolId,
      update,
    });
  }

  async createAction(action: ToolAction): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_ACTION_CREATE", {
      id: action.id,
      shortcut: action.shortcut,
      icons: normalizeIconPaths(action.icons),
      disabled: action.disabled,
    });

    this.toolActions[action.id] = action;
  }

  async removeAction(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_ACTION_REMOVE", { id });
    delete this.tools[id];
  }

  async createMode(mode: ToolMode): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_MODE_CREATE", {
      id: mode.id,
      shortcut: mode.shortcut,
      icons: normalizeIconPaths(mode.icons),
      preventDrag: mode.preventDrag,
      disabled: mode.disabled,
      cursors: mode.cursors,
    });

    this.toolModes[mode.id] = mode;
  }

  async removeMode(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_MODE_REMOVE", { id });
    delete this.tools[id];
  }

  async activateMode(toolId: string, modeId: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_MODE_ACTIVATE", {
      toolId,
      modeId,
    });
  }
}

export default ToolApi;
