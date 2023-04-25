import { Item } from "./items/Item";
import { KeyFilter } from "./KeyFilter";
import { Metadata } from "./Metadata";
import { Permission } from "./Permission";
import { Vector2 } from "./Vector2";

export interface ToolContext {
  activeTool: string;
  activeMode?: string;
  metadata: Metadata;
}

export type ToolEvent = {
  pointerPosition: Vector2;
  target?: Item;
  transformer?: boolean;
  altKey: boolean;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
};

export interface KeyEvent {
  altKey: boolean;
  code: string;
  key: string;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  repeat: boolean;
}

export interface ToolFilter {
  activeTools?: string[];
  activeModes?: string[];
  permissions?: Permission[];
  roles?: ("GM" | "PLAYER")[];
  metadata?: KeyFilter[];
}

export interface ToolIcon {
  icon: string;
  label: string;
  filter?: ToolFilter;
}

export interface ToolModeFilter extends ToolFilter {
  target?: KeyFilter[];
  dragging?: boolean;
}

export interface ToolCursor {
  cursor: string;
  filter?: ToolModeFilter;
}

export interface ToolAction {
  id: string;
  icons: ToolIcon[];
  disabled?: ToolFilter;
  onClick?: (context: ToolContext, elementId: string) => void;
  shortcut?: string;
}

export interface ToolMode {
  id: string;
  icons: ToolIcon[];
  disabled?: ToolFilter;
  cursors?: ToolCursor[];
  preventDrag?: ToolModeFilter;
  onClick?: (
    context: ToolContext,
    elementId: string,
  ) => boolean | undefined | void | Promise<boolean | undefined | void>;
  onToolClick?: (
    context: ToolContext,
    event: ToolEvent,
  ) => boolean | undefined | void | Promise<boolean | undefined | void>;
  onToolDoubleClick?: (
    context: ToolContext,
    event: ToolEvent,
  ) => boolean | undefined | void | Promise<boolean | undefined | void>;
  onToolDown?: (context: ToolContext, event: ToolEvent) => void;
  onToolMove?: (context: ToolContext, event: ToolEvent) => void;
  onToolUp?: (context: ToolContext, event: ToolEvent) => void;
  onToolDragStart?: (context: ToolContext, event: ToolEvent) => void;
  onToolDragMove?: (context: ToolContext, event: ToolEvent) => void;
  onToolDragEnd?: (context: ToolContext, event: ToolEvent) => void;
  onToolDragCancel?: (context: ToolContext, event: ToolEvent) => void;
  onKeyDown?: (context: ToolContext, event: KeyEvent) => void;
  onKeyUp?: (context: ToolContext, event: KeyEvent) => void;
  shortcut?: string;
}

export interface Tool {
  id: string;
  icons: ToolIcon[];
  disabled?: ToolFilter;
  onClick?: (
    context: ToolContext,
    elementId: string,
  ) => boolean | undefined | void | Promise<boolean | undefined | void>;
  shortcut?: string;
  defaultMode?: string;
  defaultMetadata?: Metadata;
}
