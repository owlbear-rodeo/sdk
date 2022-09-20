import { Vector2 } from "../Vector2";
import { Item } from "./Item";

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
