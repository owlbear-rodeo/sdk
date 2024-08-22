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

export type Descendant = Element | FormattedText;

export type BulletedListElement = {
  type: "bulleted-list";
  children: Descendant[];
};

export type NumberedListElement = {
  type: "numbered-list";
  children: Descendant[];
};

export type HeadingOneElement = { type: "heading-one"; children: Descendant[] };

export type HeadingTwoElement = { type: "heading-two"; children: Descendant[] };

export type ListItemElement = { type: "list-item"; children: Descendant[] };

export type ParagraphElement = { type: "paragraph"; children: Descendant[] };

export type Element =
  | BulletedListElement
  | NumberedListElement
  | HeadingOneElement
  | HeadingTwoElement
  | ListItemElement
  | ParagraphElement;

export type ElementFormat = Element["type"];

export type FormattedText = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  text: string;
};

export type MarkFormat = keyof Omit<FormattedText, "text">;

export type RichText = Descendant[];

export function isFormattedText(
  descendant: Descendant,
): descendant is FormattedText {
  return "text" in descendant;
}

export function isElement(descendant: Descendant): descendant is Element {
  return "children" in descendant;
}

export interface TextContent {
  /** The text formatted as Slate nodes */
  richText: RichText;
  /** The text without any formatting */
  plainText: string;
  style: TextStyle;
  /** Which text value should be used `PLAIN` for `plainText` and `RICH` for `richText` */
  type: TextContentType;
  width: TextSize;
  height: TextSize;
}

export type TextItemType = "LABEL" | "TEXT";
