import { BoundingBox } from "./BoundingBox";
import { KeyFilter } from "./KeyFilter";
import { Item } from "./items/Item";
import { Restriction } from "./Restriction";

export interface ContextMenuContext {
  items: Item[];
  selectionBounds: BoundingBox;
}

export interface ContextMenuIconFilter {
  min?: number;
  max?: number;
  permissions?: ("EDIT" | "DELETE" | "CREATE" | Restriction)[];
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
