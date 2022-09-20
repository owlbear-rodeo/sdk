import { Vector2 } from "../Vector2";

export interface ImageGrid {
  /**  Offset relative to the image */
  offset: Vector2;
  /**
   * Dots per inch of the image
   * Determines the resolution of one grid cell in the image
   */
  dpi: number;
}
