import { TextContent } from "./TextContent.js";
import { Item } from "./Item.js";

export interface Text extends Item {
  type: "TEXT";
  text: TextContent;
}

export function isText(item: Item): item is Text {
  return item.type === "TEXT";
}
