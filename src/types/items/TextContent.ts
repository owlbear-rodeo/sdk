export type TextSize = "AUTO" | number;

export interface TextStyle {
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeOpacity: number;
  strokeWidth: number;
  textAlign: "LEFT" | "CENTER" | "RIGHT";
  textAlignVertical: "BOTTOM" | "MIDDLE" | "TOP";
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  padding: number;
}

export type TextContentType = "PLAIN" | "RICH";

// TODO: Type rich text
export type RichText = any[];

export interface TextContent {
  /** The text formatted as Slate nodes */
  richText: RichText;
  /** The text without any formatting */
  plainText: string;
  style: TextStyle;
  /** Does this text support rich text formatting like headings. If `PLAIN` a faster text rendering path will be used. */
  type: TextContentType;
  width: TextSize;
  height: TextSize;
}

export type TextItemType = "LABEL" | "TEXT";
