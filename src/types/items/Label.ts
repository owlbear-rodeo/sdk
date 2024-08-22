import { TextContent } from "./TextContent";
import { Item } from "./Item";

export interface LabelStyle {
  backgroundColor: string;
  backgroundOpacity: number;
  cornerRadius: number;
  pointerWidth?: number;
  pointerHeight?: number;
  pointerDirection?: "UP" | "DOWN" | "LEFT" | "RIGHT";
  maxViewScale?: number;
  minViewScale?: number;
}

export interface Label extends Item {
  type: "LABEL";
  text: TextContent;
  style: LabelStyle;
}

export function isLabel(item: Item): item is Label {
  return item.type === "LABEL";
}
