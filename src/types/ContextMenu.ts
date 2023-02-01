import { BoundingBox } from "./BoundingBox";
import { KeyFilter } from "./KeyFilter";
import { Item } from "./items/Item";
import { Permission } from "./Permission";

export interface ContextMenuContext {
  items: Item[];
  selectionBounds: BoundingBox;
}

export interface ContextMenuIconFilter {
  min?: number;
  max?: number;
  permissions?: ("CREATE" | "UPDATE" | "DELETE" | Permission)[];
  roles?: ("GM" | "PLAYER")[];
  every?: KeyFilter[];
  some?: KeyFilter[];
}

export interface ContextMenuIcon {
  icon: string;
  label: string;
  filter?: ContextMenuIconFilter;
}

export interface ContextMenuItem {
  id: string;
  icons: ContextMenuIcon[];
  onClick: (context: ContextMenuContext, elementId: string) => void;
  shortcut?: string;
}
