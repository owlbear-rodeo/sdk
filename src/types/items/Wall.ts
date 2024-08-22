import { Vector2 } from "../Vector2";
import { Item } from "./Item";

export interface Wall extends Item {
  type: "WALL";
  points: Vector2[];
  doubleSided: boolean;
  blocking: boolean;
}

export function isWall(item: Item): item is Wall {
  return item.type === "WALL";
}
