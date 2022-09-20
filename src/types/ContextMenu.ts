import { BoundingBox } from "./BoundingBox";
import { Item } from "./items/Item";

export interface ContextMenuContext {
  items: Item[];
  selectionBounds: BoundingBox;
}

export interface ContextMenuIcon {
  svgIcon: string;
  label: string;
}

export interface ContextMenuState {
  id: string;
  svgIcon: string;
  label: string;
  show: boolean;
}

export interface ContextMenuItem {
  shouldShow: (context: ContextMenuContext) => boolean;
  onClick: (context: ContextMenuContext, elementId: string) => void;
  renderIcon: (context: ContextMenuContext) => ContextMenuIcon;
  shortcut?: string;
}
