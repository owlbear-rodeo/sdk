import { Item } from "./Item";

export interface ShapeStyle {
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeOpacity: number;
  strokeWidth: number;
  strokeDash: number[];
}

export type ShapeType = "RECTANGLE" | "CIRCLE" | "TRIANGLE" | "HEXAGON";

export interface Shape extends Item {
  type: "SHAPE";
  width: number;
  height: number;
  shapeType: ShapeType;
  style: ShapeStyle;
}

export function isShape(item: Item): item is Shape {
  return item.type === "SHAPE";
}
