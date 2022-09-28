import { Item } from "./items/Item";
import { KeyFilter } from "./KeyFilter";
import { Metadata } from "./Metatdata";
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
};

type PermissionFilter = ("EDIT" | "DELETE" | "CREATE")[];

type Permissions = {
  fog?: PermissionFilter;
  images?: PermissionFilter;
  drawing?: PermissionFilter;
  ruler?: PermissionFilter;
  pointer?: PermissionFilter;
  text?: PermissionFilter;
};

export interface ToolFilter {
  activeTools?: string[];
  activeModes?: string[];
  permissions?: Permissions;
  roles?: ("GM" | "PLAYER")[];
  metadata?: KeyFilter<Metadata>[];
}

export interface ToolIcon {
  icon: string;
  label: string;
  filter?: ToolFilter;
}

export interface ToolCursorFilter extends ToolFilter {
  target?: KeyFilter<Item>[];
}

export interface ToolCursor {
  cursor: string;
  filter?: ToolCursorFilter;
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
  onClick?: (
    context: ToolContext,
    elementId: string,
  ) => boolean | undefined | void;
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
  shortcut?: string;
}

export interface Tool {
  id: string;
  icons: ToolIcon[];
  disabled?: ToolFilter;
  onClick?: (
    context: ToolContext,
    elementId: string,
  ) => boolean | undefined | void;
  shortcut?: string;
  defaultMode?: string;
  defaultMetadata?: Metadata;
}
