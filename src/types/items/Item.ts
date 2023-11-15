import { Metadata } from "../Metadata";
import { Vector2 } from "../Vector2";

export type Layer =
  | "MAP"
  | "GRID"
  | "DRAWING"
  | "PROP"
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

export type AttachmentBehavior =
  | "VISIBLE"
  | "SCALE"
  | "ROTATION"
  | "POSITION"
  | "DELETE"
  | "LOCKED"
  | "COPY";

export interface Item {
  readonly id: string;
  readonly type: string;
  name: string;
  visible: boolean;
  locked: boolean;
  createdUserId: string;
  zIndex: number;
  readonly lastModified: string;
  readonly lastModifiedUserId: string;
  position: Vector2;
  rotation: number;
  scale: Vector2;
  metadata: Metadata;
  layer: Layer;
  attachedTo?: string;
  disableHit?: boolean;
  disableAutoZIndex?: boolean;
  disableAttachmentBehavior?: AttachmentBehavior[];
  description?: string;
}
