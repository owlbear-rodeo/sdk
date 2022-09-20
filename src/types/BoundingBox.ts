import { Vector2 } from "./Vector2";

export type BoundingBox = {
  min: Vector2;
  max: Vector2;
  width: number;
  height: number;
  center: Vector2;
};
