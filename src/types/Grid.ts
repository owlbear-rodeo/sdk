export type GridColor = "DARK" | "LIGHT";

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

export type GridType = "SQUARE" | "HEX_VERTICAL" | "HEX_HORIZONTAL";

export type GridLineType = "SOLID" | "DASHED";

export type GridMeasurement =
  | "CHEBYSHEV"
  | "ALTERNATING"
  | "EUCLIDEAN"
  | "MANHATTAN";
