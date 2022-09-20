import MessageBus from "../messages/MessageBus";
import {
  Tool,
  ToolAction,
  ToolContext,
  ToolEvent,
  ToolMode,
  ToolModeState,
  ToolState,
} from "../types/Tool";

class ToolApi {
  private messageBus: MessageBus;
  private tools: Record<string, Tool> = {};
  private toolActions: Record<string, ToolAction> = {};
  private toolModes: Record<string, ToolMode> = {};

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
    messageBus.on("OBR_TOOL_EVENT_CLICK", this.handleToolClick);
    messageBus.on("OBR_TOOL_EVENT_RENDER", this.handleToolRender);
    messageBus.on("OBR_TOOL_EVENT_SHOW", this.handleToolShow);
    messageBus.on("OBR_TOOL_EVENT_DISABLED", this.handleToolDisabled);

    messageBus.on("OBR_TOOL_ACTION_EVENT_CLICK", this.handleToolActionClick);
    messageBus.on("OBR_TOOL_ACTION_EVENT_RENDER", this.handleToolActionRender);
    messageBus.on("OBR_TOOL_ACTION_EVENT_SHOW", this.handleToolActionShow);
    messageBus.on(
      "OBR_TOOL_ACTION_EVENT_DISABLED",
      this.handleToolActionDisabled,
    );

    messageBus.on("OBR_TOOL_MODE_EVENT_CLICK", this.handleToolModeClick);
    messageBus.on("OBR_TOOL_MODE_EVENT_RENDER", this.handleToolModeRender);
    messageBus.on("OBR_TOOL_MODE_EVENT_SHOW", this.handleToolModeShow);
    messageBus.on("OBR_TOOL_MODE_EVENT_DISABLED", this.handleToolModeDisabled);
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
    messageBus.on(
      "OBR_TOOL_MODE_EVENT_TOOL_CURSOR",
      this.handleToolModeToolCursor,
    );
  }

  private handleToolClick = (event: {
    state: ToolState;
    context: ToolContext;
    elementId: string;
  }) => {
    const tool = this.tools[event.state.id];
    if (tool) {
      if (tool.onClick) {
        const activate = tool.onClick(event.context, event.elementId);
        if (activate) {
          this.messageBus.send("OBR_TOOL_ACTIVATE", {
            id: event.state.id,
          });
        }
      } else {
        this.messageBus.send("OBR_TOOL_ACTIVATE", {
          id: event.state.id,
        });
      }
    }
  };

  private handleToolRender = (event: {
    state: ToolState;
    context: ToolContext;
  }) => {
    const tool = this.tools[event.state.id];
    if (tool) {
      const newIcon = tool.renderIcon(event.context);
      if (newIcon.svgIcon !== event.state.svgIcon) {
        this.messageBus.send("OBR_TOOL_SET_ICON", {
          id: event.state.id,
          svgIcon: newIcon.svgIcon,
        });
      }
      if (newIcon.label !== event.state.label) {
        this.messageBus.send("OBR_TOOL_SET_LABEL", {
          id: event.state.id,
          label: newIcon.label,
        });
      }
    }
  };

  private handleToolShow = (event: {
    state: ToolState;
    context: ToolContext;
  }) => {
    const tool = this.tools[event.state.id];
    if (tool) {
      const show = tool.shouldShow(event.context);
      if (show !== event.state.show) {
        this.messageBus.send("OBR_TOOL_SET_SHOW", {
          show,
          id: event.state.id,
        });
      }
    }
  };

  private handleToolDisabled = (event: {
    state: ToolState;
    context: ToolContext;
  }) => {
    const tool = this.tools[event.state.id];
    if (tool) {
      const disabled = tool.isDisabled?.(event.context) || false;
      if (disabled !== event.state.disabled) {
        this.messageBus.send("OBR_TOOL_SET_DISABLED", {
          disabled,
          id: event.state.id,
        });
      }
    }
  };

  private handleToolActionClick = (event: {
    state: ToolState;
    context: ToolContext;
    elementId: string;
  }) => {
    const action = this.toolActions[event.state.id];
    if (action) {
      action.onClick?.(event.context, event.elementId);
    }
  };

  private handleToolActionRender = (event: {
    state: ToolState;
    context: ToolContext;
  }) => {
    const action = this.toolActions[event.state.id];
    if (action) {
      const newIcon = action.renderIcon(event.context);
      if (newIcon.svgIcon !== event.state.svgIcon) {
        this.messageBus.send("OBR_TOOL_ACTION_SET_ICON", {
          id: event.state.id,
          svgIcon: newIcon.svgIcon,
        });
      }
      if (newIcon.label !== event.state.label) {
        this.messageBus.send("OBR_TOOL_ACTION_SET_LABEL", {
          id: event.state.id,
          label: newIcon.label,
        });
      }
    }
  };

  private handleToolActionShow = (event: {
    state: ToolState;
    context: ToolContext;
  }) => {
    const action = this.toolActions[event.state.id];
    if (action) {
      const show = action.shouldShow(event.context);
      if (show !== event.state.show) {
        this.messageBus.send("OBR_TOOL_ACTION_SET_SHOW", {
          show,
          id: event.state.id,
        });
      }
    }
  };

  private handleToolActionDisabled = (event: {
    state: ToolState;
    context: ToolContext;
  }) => {
    const action = this.toolActions[event.state.id];
    if (action) {
      const disabled = action.isDisabled?.(event.context) || false;
      if (disabled !== event.state.disabled) {
        this.messageBus.send("OBR_TOOL_ACTION_SET_DISABLED", {
          disabled,
          id: event.state.id,
        });
      }
    }
  };

  private handleToolModeClick = (event: {
    state: ToolModeState;
    context: ToolContext;
    elementId: string;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      if (mode.onClick) {
        const activate = mode.onClick(event.context, event.elementId);
        if (activate) {
          this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
            toolId: event.context.activeTool,
            modeId: event.state.id,
          });
        }
      } else {
        this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
          toolId: event.context.activeTool,
          modeId: event.state.id,
        });
      }
    }
  };

  private handleToolModeRender = (event: {
    state: ToolModeState;
    context: ToolContext;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      const newIcon = mode.renderIcon(event.context);
      if (newIcon.svgIcon !== event.state.svgIcon) {
        this.messageBus.send("OBR_TOOL_MODE_SET_ICON", {
          id: event.state.id,
          svgIcon: newIcon.svgIcon,
        });
      }
      if (newIcon.label !== event.state.label) {
        this.messageBus.send("OBR_TOOL_MODE_SET_LABEL", {
          id: event.state.id,
          label: newIcon.label,
        });
      }
    }
  };

  private handleToolModeShow = (event: {
    state: ToolModeState;
    context: ToolContext;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      const show = mode.shouldShow(event.context);
      if (show !== event.state.show) {
        this.messageBus.send("OBR_TOOL_MODE_SET_SHOW", {
          show,
          id: event.state.id,
        });
      }
    }
  };

  private handleToolModeDisabled = (event: {
    state: ToolModeState;
    context: ToolContext;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      const disabled = mode.isDisabled?.(event.context) || false;
      if (disabled !== event.state.disabled) {
        this.messageBus.send("OBR_TOOL_MODE_SET_DISABLED", {
          disabled,
          id: event.state.id,
        });
      }
    }
  };

  private handleToolModeToolClick = (event: {
    state: ToolModeState;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      mode.onToolClick?.(event.context, event.event);
    }
  };

  private handleToolModeToolDoubleClick = (event: {
    state: ToolModeState;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      mode.onToolDoubleClick?.(event.context, event.event);
    }
  };

  private handleToolModeToolDown = (event: {
    state: ToolModeState;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      mode.onToolDown?.(event.context, event.event);
    }
  };

  private handleToolModeToolMove = (event: {
    state: ToolModeState;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      mode.onToolMove?.(event.context, event.event);
    }
  };

  private handleToolModeToolUp = (event: {
    state: ToolModeState;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      mode.onToolUp?.(event.context, event.event);
    }
  };

  private handleToolModeToolDragStart = (event: {
    state: ToolModeState;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      mode.onToolDragStart?.(event.context, event.event);
    }
  };

  private handleToolModeToolDragMove = (event: {
    state: ToolModeState;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      mode.onToolDragMove?.(event.context, event.event);
    }
  };

  private handleToolModeToolDragEnd = (event: {
    state: ToolModeState;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      mode.onToolDragEnd?.(event.context, event.event);
    }
  };

  private handleToolModeToolDragCancel = (event: {
    state: ToolModeState;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      mode.onToolDragCancel?.(event.context, event.event);
    }
  };

  private handleToolModeToolCursor = (event: {
    state: ToolModeState;
    context: ToolContext;
    event: ToolEvent;
  }) => {
    const mode = this.toolModes[event.state.id];
    if (mode) {
      const cursor = mode.getCursor?.(event.context, event.event);
      if (cursor !== event.state.cursor) {
        this.messageBus.send("OBR_TOOL_MODE_SET_CURSOR", {
          cursor,
          id: event.state.id,
        });
      }
    }
  };

  async create(tool: Tool): Promise<string> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_TOOL_CREATE",
      {
        shortcut: tool.shortcut,
        defaultMode: tool.defaultMode,
        defaultMetadata: tool.defaultMetadata,
      },
    );

    this.tools[id] = tool;

    return id;
  }

  async remove(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_REMOVE", { id });
    delete this.tools[id];
  }

  async activateTool(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_ACTIVATE", { id });
  }

  async createAction(action: ToolAction): Promise<string> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_TOOL_ACTION_CREATE",
      {
        shortcut: action.shortcut,
      },
    );

    this.toolActions[id] = action;

    return id;
  }

  async removeAction(id: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_TOOL_ACTION_REMOVE", { id });
    delete this.tools[id];
  }

  async createMode(mode: ToolMode): Promise<string> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_TOOL_MODE_CREATE",
      {
        shortcut: mode.shortcut,
      },
    );

    this.toolModes[id] = mode;

    return id;
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
