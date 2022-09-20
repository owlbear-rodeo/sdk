import { Item } from "./items/Item";
import { Metadata } from "./Metatdata";
import { Vector2 } from "./Vector2";

export interface ToolContext {
  activeTool: string;
  activeMode?: string;
  metadata: Metadata;
}

export interface ToolIcon {
  svgIcon: string;
  label: string;
}

export type ToolEvent = {
  pointerPosition: Vector2;
  target?: Item;
  transformer?: boolean;
};

export interface ToolState {
  id: string;
  svgIcon: string;
  label: string;
  show: boolean;
  disabled: boolean;
}

export interface ToolModeState extends ToolState {
  cursor: string;
}

export interface ToolAction {
  shouldShow: (context: ToolContext) => boolean;
  isDisabled?: (context: ToolContext) => boolean;
  onClick?: (context: ToolContext, elementId: string) => void;
  renderIcon: (context: ToolContext) => ToolIcon;
  shortcut?: string;
}

export interface ToolMode {
  shouldShow: (context: ToolContext) => boolean;
  isDisabled?: (context: ToolContext) => boolean;
  onClick?: (
    context: ToolContext,
    elementId: string,
  ) => boolean | undefined | void;
  renderIcon: (context: ToolContext) => ToolIcon;
  onToolClick?: (
    context: ToolContext,
    event: ToolEvent,
  ) => boolean | undefined | void;
  onToolDoubleClick?: (
    context: ToolContext,
    event: ToolEvent,
  ) => boolean | undefined | void;
  onToolDown?: (context: ToolContext, event: ToolEvent) => void;
  onToolMove?: (context: ToolContext, event: ToolEvent) => void;
  onToolUp?: (context: ToolContext, event: ToolEvent) => void;
  onToolDragStart?: (
    context: ToolContext,
    event: ToolEvent,
  ) => boolean | undefined | void;
  onToolDragMove?: (context: ToolContext, event: ToolEvent) => void;
  onToolDragEnd?: (context: ToolContext, event: ToolEvent) => void;
  onToolDragCancel?: (context: ToolContext, event: ToolEvent) => void;
  getCursor?: (context: ToolContext, event: ToolEvent) => string;
  shortcut?: string;
}

export interface Tool {
  shouldShow: (context: ToolContext) => boolean;
  isDisabled?: (context: ToolContext) => boolean;
  onClick?: (
    context: ToolContext,
    elementId: string,
  ) => boolean | undefined | void;
  renderIcon: (context: ToolContext) => ToolIcon;
  shortcut?: string;
  defaultMode?: string;
  defaultMetadata?: Metadata;
}
