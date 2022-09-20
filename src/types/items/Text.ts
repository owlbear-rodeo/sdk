import { TextContent } from "./TextContent";
import { Item } from "./Item";

export interface Text extends Item {
  type: "TEXT";
  text: TextContent;
}

export function isText(item: Item): item is Text {
  return item.type === "TEXT";
}
