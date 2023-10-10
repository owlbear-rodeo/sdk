import { Fog } from "./Fog";
import { Grid } from "./Grid";
import { Vector2 } from "./Vector2";
import { ImageGrid } from "./items/ImageGrid";
import { Item } from "./items/Item";

export interface SceneUpload {
  name: string;
  grid: Grid;
  fog: Fog;
  items: Item[];
  baseMap?: ImageUpload;
}

export interface ImageUpload {
  file: File | Blob;
  name: string;
  grid: ImageGrid;
  rotation: number;
  scale: Vector2;
}
