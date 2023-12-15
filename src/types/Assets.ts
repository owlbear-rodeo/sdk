import { Fog } from "./Fog.js";
import { Grid } from "./Grid.js";
import { Vector2 } from "./Vector2.js";
import { ImageGrid } from "./items/ImageGrid.js";
import { Item } from "./items/Item.js";
import { TextContent, TextItemType } from "./items/TextContent.js";

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
  text: TextContent;
  textItemType: TextItemType;
  grid: ImageGrid;
  visible: boolean;
  locked: boolean;
  rotation: number;
  scale: Vector2;
  description?: string;
}
