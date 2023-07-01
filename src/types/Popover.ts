export interface Popover {
  id: string;
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
  hidePaper?: boolean;
  disableClickAway?: boolean;
  marginThreshold?: number;
}
