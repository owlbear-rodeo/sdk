import { RichText, TextContent, TextSize } from "../types/items/TextContent";
import { Text } from "../types/items/Text";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class TextBuilder extends GenericItemBuilder<TextBuilder> {
  private _text: TextContent;

  constructor() {
    super();
    this._text = {
      richText: [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
      plainText: "",
      style: {
        padding: 0,
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: 400,
        textAlign: "LEFT",
        textAlignVertical: "TOP",
        fillColor: "white",
        fillOpacity: 1,
        strokeColor: "white",
        strokeOpacity: 1,
        strokeWidth: 0,
        lineHeight: 1.5,
      },
      type: "RICH",
      width: "AUTO",
      height: "AUTO",
    };
    this._item.layer = "TEXT";
    this._item.name = "Text";
  }

  text(text: TextContent): TextBuilder {
    this._text = text;
    return this.self();
  }

  width(width: TextSize): TextBuilder {
    this._text.width = width;
    return this.self();
  }

  height(height: TextSize): TextBuilder {
    this._text.height = height;
    return this.self();
  }

  richText(richText: RichText): TextBuilder {
    this._text.richText = richText;
    return this.self();
  }

  plainText(plainText: string): TextBuilder {
    this._text.plainText = plainText;
    return this.self();
  }

  padding(padding: number): TextBuilder {
    this._text.style.padding = padding;
    return this.self();
  }

  fontFamily(fontFamily: string): TextBuilder {
    this._text.style.fontFamily = fontFamily;
    return this.self();
  }

  fontSize(fontSize: number): TextBuilder {
    this._text.style.fontSize = fontSize;
    return this.self();
  }

  fontWeight(fontWeight: number): TextBuilder {
    this._text.style.fontWeight = fontWeight;
    return this.self();
  }

  textAlign(textAlign: "LEFT" | "CENTER" | "RIGHT"): TextBuilder {
    this._text.style.textAlign = textAlign;
    return this.self();
  }

  textAlignVertical(
    textAlignVertical: "BOTTOM" | "MIDDLE" | "TOP",
  ): TextBuilder {
    this._text.style.textAlignVertical = textAlignVertical;
    return this.self();
  }

  fillColor(fillColor: string): TextBuilder {
    this._text.style.fillColor = fillColor;
    return this.self();
  }

  fillOpacity(fillOpacity: number): TextBuilder {
    this._text.style.fillOpacity = fillOpacity;
    return this.self();
  }

  strokeColor(strokeColor: string): TextBuilder {
    this._text.style.strokeColor = strokeColor;
    return this.self();
  }

  strokeOpacity(strokeOpacity: number): TextBuilder {
    this._text.style.strokeOpacity = strokeOpacity;
    return this.self();
  }

  strokeWidth(strokeWidth: number): TextBuilder {
    this._text.style.strokeWidth = strokeWidth;
    return this.self();
  }

  lineHeight(lineHeight: number): TextBuilder {
    this._text.style.lineHeight = lineHeight;
    return this.self();
  }

  build(): Text {
    return {
      ...this._item,
      type: "TEXT",
      text: this._text,
    };
  }
}
