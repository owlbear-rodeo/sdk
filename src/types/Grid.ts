export type GridColor = "DARK" | "LIGHT" | "HIGHLIGHT" | string;

export interface GridScale {
  raw: string;
  parsed: {
    /** The number multiplier of the scale */
    multiplier: number;
    /** The unit of the scale */
    unit: string;
    /** The precision of the scale */
    digits: number;
  };
}

export type GridType =
  | "SQUARE"
  | "HEX_VERTICAL"
  | "HEX_HORIZONTAL"
  | "DIMETRIC"
  | "ISOMETRIC";

export type GridLineType = "SOLID" | "DASHED" | "DOTTED";

export interface GridStyle {
  lineType: GridLineType;
  lineOpacity: number;
  lineColor: GridColor;
  lineWidth: number;
}

export type GridMeasurement =
  | "CHEBYSHEV"
  | "ALTERNATING"
  | "EUCLIDEAN"
  | "MANHATTAN";

export interface Grid {
  /**
   * Dots per inch of the scene
   * Determines the resolution of one grid cell.
   * For square grids this represents both the width and height of the grid cell.
   * For vertically oriented hex grids this is the width of the grid cell.
   * For horizontally oriented hex grids this is the height of the grid cell.
   */
  dpi: number;
  style: GridStyle;
  type: GridType;
  measurement: GridMeasurement;
  /**
   * Scale of the grid
   * @example
   * 5ft
   */
  scale: string;
}
