import { ImageContent } from "./ImageContent";
import { ImageGrid } from "./ImageGrid";
import { TextContent, TextItemType } from "./TextContent";
import { Item } from "./Item";

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
