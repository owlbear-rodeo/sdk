import { Metadata } from "../Metatdata";
import { Vector2 } from "../Vector2";

export type Layer =
  | "MAP"
  | "GRID"
  | "PROP"
  | "DRAWING"
  | "MOUNT"
  | "CHARACTER"
  | "ATTACHMENT"
  | "NOTE"
  | "TEXT"
  | "RULER"
  | "FOG"
  | "POINTER"
  | "CONTROL"
  | "POPOVER";

export interface Item {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  locked: boolean;
  createdUserId: string;
  zIndex: number;
  lastModified: string;
  lastModifiedUserId: string;
  position: Vector2;
  rotation: number;
  scale: Vector2;
  metadata: Metadata;
  layer: Layer;
  attachedTo?: string;
  disableHit?: boolean;
}
