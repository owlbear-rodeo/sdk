import { Item } from "./Item";

export interface Pointer extends Item {
  type: "POINTER";
  color: string;
  radius: number;
}

export function isPointer(item: Item): item is Pointer {
  return item.type === "POINTER";
}
