import { Item } from "./Item";

export interface Light extends Item {
  type: "LIGHT";
  attenuationRadius: number;
  sourceRadius: number;
  falloff: number;
  innerAngle: number;
  outerAngle: number;
}

export function isLight(item: Item): item is Light {
  return item.type === "LIGHT";
}
