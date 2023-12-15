import { Vector2 } from "../Vector2.js";
import { Item } from "./Item.js";

export type RulerVariant = "FILLED" | "DASHED";

export interface RulerStyle {
  variant: RulerVariant;
}

export interface Ruler extends Item {
  type: "RULER";
  startPosition: Vector2;
  endPosition: Vector2;
  measurement: string;
  style: RulerStyle;
}

export function isRuler(item: Item): item is Ruler {
  return item.type === "RULER";
}
