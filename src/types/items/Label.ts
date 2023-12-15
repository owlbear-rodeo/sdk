import { TextContent } from "./TextContent.js";
import { Item } from "./Item.js";

export interface LabelStyle {
  backgroundColor: string;
  backgroundOpacity: number;
  cornerRadius: number;
  pointerWidth?: number;
  pointerHeight?: number;
  pointerDirection?: "UP" | "DOWN" | "LEFT" | "RIGHT";
}

export interface Label extends Item {
  type: "LABEL";
  text: TextContent;
  style: LabelStyle;
}

export function isLabel(item: Item): item is Label {
  return item.type === "LABEL";
}
