import { Matrix } from "../Matrix";
import { Vector2 } from "../Vector2";
import { Vector3 } from "../Vector3";
import { Item } from "./Item";

export interface Uniform {
  name: string;
  value: number | Vector2 | Vector3 | Matrix;
}

export type EffectType = "STANDALONE" | "ATTACHMENT" | "VIEWPORT";

export type BlendMode =
  | "CLEAR"
  | "SRC"
  | "DST"
  | "SRC_OVER"
  | "DST_OVER"
  | "SRC_IN"
  | "DST_IN"
  | "SRC_OUT"
  | "DST_OUT"
  | "SRC_ATOP"
  | "DST_ATOP"
  | "XOR"
  | "PLUS"
  | "MODULATE"
  | "SCREEN"
  | "OVERLAY"
  | "DARKEN"
  | "LIGHTEN"
  | "COLOR_DODGE"
  | "COLOR_BURN"
  | "HARD_LIGHT"
  | "SOFT_LIGHT"
  | "DIFFERENCE"
  | "EXCLUSION"
  | "MULTIPLY"
  | "HUE"
  | "SATURATION"
  | "COLOR"
  | "LUMINOSITY";

export interface Effect extends Item {
  type: "EFFECT";
  width: number;
  height: number;
  effectType: EffectType;
  sksl: string;
  uniforms: Uniform[];
  blendMode: BlendMode;
}

export function isEffect(item: Item): item is Effect {
  return item.type === "EFFECT";
}
