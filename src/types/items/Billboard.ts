import { ImageContent } from "./ImageContent";
import { ImageGrid } from "./ImageGrid";
import { Item } from "./Item";

export interface BillboardStyle {
  maxViewScale?: number;
  minViewScale?: number;
}

export interface Billboard extends Item {
  image: ImageContent;
  grid: ImageGrid;
  style: BillboardStyle;
  type: "BILLBOARD";
}

export function isBillboard(item: Item): item is Billboard {
  return item.type === "BILLBOARD";
}
