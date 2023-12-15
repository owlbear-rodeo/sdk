import { Vector2 } from "./Vector2.js";

export type BoundingBox = {
  min: Vector2;
  max: Vector2;
  width: number;
  height: number;
  center: Vector2;
};
