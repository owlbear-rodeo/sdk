import { Vector2 } from "../Vector2.js";
import { Item } from "./Item.js";

export interface LineStyle {
  strokeColor: string;
  strokeOpacity: number;
  strokeWidth: number;
  strokeDash: number[];
}

export interface Line extends Item {
  type: "LINE";
  startPosition: Vector2;
  endPosition: Vector2;
  style: LineStyle;
}

export function isLine(item: Item): item is Line {
  return item.type === "LINE";
}
