import { Vector2 } from "../Vector2";
import { Item } from "./Item";

export interface CurveStyle {
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeOpacity: number;
  strokeWidth: number;
  strokeDash: number[];
  tension: number;
}

export interface Curve extends Item {
  type: "CURVE";
  points: Vector2[];
  style: CurveStyle;
}

export function isCurve(item: Item): item is Curve {
  return item.type === "CURVE";
}
