import { Fog } from "./Fog";
import { Grid } from "./Grid";
import { Vector2 } from "./Vector2";
import { ImageContent } from "./items/ImageContent";
import { ImageGrid } from "./items/ImageGrid";
import { Item } from "./items/Item";
import { TextContent, TextItemType } from "./items/TextContent";

export interface SceneUpload {
  name: string;
  grid: Grid;
  fog: Fog;
  items: Item[];
  baseMap?: ImageUpload;
  thumbnail?: File | Blob;
}

export interface ImageUpload {
  file: File | Blob;
  name: string;
  text: TextContent;
  textItemType: TextItemType;
  grid: ImageGrid;
  visible: boolean;
  locked: boolean;
  rotation: number;
  scale: Vector2;
  description?: string;
}

export type ImageAssetType =
  | "MAP"
  | "PROP"
  | "MOUNT"
  | "CHARACTER"
  | "ATTACHMENT"
  | "NOTE";

export interface ImageDownload {
  name: string;
  image: ImageContent;
  text: TextContent;
  textItemType: TextItemType;
  grid: ImageGrid;
  visible: boolean;
  locked: boolean;
  rotation: number;
  scale: Vector2;
  description?: string;
  type: ImageAssetType;
}

export interface SceneDownload {
  name: string;
  grid: Grid;
  fog: Fog;
  items: Item[];
}
