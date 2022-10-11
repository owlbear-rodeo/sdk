export interface Popover {
  url: string;
  width: number;
  height: number;
  anchorElementId?: string;
  anchorPosition?: { left: number; top: number };
  anchorOrigin?: {
    horizontal: "CENTER" | "LEFT" | "RIGHT";
    vertical: "BOTTOM" | "CENTER" | "TOP";
  };
  transformOrigin?: {
    horizontal: "CENTER" | "LEFT" | "RIGHT";
    vertical: "BOTTOM" | "CENTER" | "TOP";
  };
  anchorReference?: "ELEMENT" | "POSITION";
}
