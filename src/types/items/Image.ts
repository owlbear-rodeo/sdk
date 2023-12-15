import { ImageContent } from "./ImageContent.js";
import { ImageGrid } from "./ImageGrid.js";
import { TextContent, TextItemType } from "./TextContent.js";
import { Item } from "./Item.js";

export interface Image extends Item {
  image: ImageContent;
  grid: ImageGrid;
  text: TextContent;
  textItemType: TextItemType;
  type: "IMAGE";
}

export function isImage(item: Item): item is Image {
  return item.type === "IMAGE";
}
