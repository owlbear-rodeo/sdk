import { BoundingBox } from "./BoundingBox.js";
import { KeyFilter } from "./KeyFilter.js";
import { Item } from "./items/Item.js";
import { Permission } from "./Permission.js";

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

export interface ContextMenuEmbed {
  url: string;
  height?: number;
}

export interface ContextMenuItem {
  id: string;
  icons: ContextMenuIcon[];
  onClick?: (context: ContextMenuContext, elementId: string) => void;
  shortcut?: string;
  embed?: ContextMenuEmbed;
}
