import { Item } from "./Item";

export type LightType = "PRIMARY" | "SECONDARY";

export interface Light extends Item {
  type: "LIGHT";
  attenuationRadius: number;
  sourceRadius: number;
  falloff: number;
  innerAngle: number;
  outerAngle: number;
  lightType: LightType;
}

export function isLight(item: Item): item is Light {
  return item.type === "LIGHT";
}
