import { BoundingBox } from "./BoundingBox";
import { KeyFilter } from "./KeyFilter";
import { Item } from "./items/Item";

export interface ContextMenuContext {
  items: Item[];
  selectionBounds: BoundingBox;
}

export interface ContextMenuIconFilter {
  min?: number;
  max?: number;
  permissions?: ("EDIT" | "DELETE" | "CREATE")[];
  roles?: ("GM" | "PLAYER")[];
  every?: KeyFilter<Item>[];
  some?: KeyFilter<Item>[];
}

export interface ContextMenuIcon {
  svgIcon: string;
  label: string;
  filter?: ContextMenuIconFilter;
}

export interface ContextMenuItem {
  icons: ContextMenuIcon[];
  onClick: (context: ContextMenuContext, elementId: string) => void;
  shortcut?: string;
}
