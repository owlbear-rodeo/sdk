import PlayerApi from "../api/PlayerApi";
import { Label, LabelStyle } from "../types/items/Label";
import { TextContent, TextSize } from "../types/items/TextContent";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class LabelBuilder extends GenericItemBuilder<LabelBuilder> {
  private _text: TextContent;
  private _style: LabelStyle;

  constructor(player: PlayerApi) {
    super(player);
    this._text = {
      richText: [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
      plainText: "",
      style: {
        padding: 8,
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: 400,
        textAlign: "CENTER",
        textAlignVertical: "MIDDLE",
        fillColor: "white",
        fillOpacity: 1,
        strokeColor: "white",
        strokeOpacity: 1,
        strokeWidth: 0,
        lineHeight: 1.5,
      },
      type: "PLAIN",
      width: "AUTO",
      height: "AUTO",
    };
    this._style = {
      backgroundColor: "#3D4051",
      backgroundOpacity: 1,
      cornerRadius: 8,
      pointerDirection: "DOWN",
      pointerWidth: 4,
      pointerHeight: 4,
    };
    this._item.layer = "TEXT";
    this._item.name = "Label";
  }

  text(text: TextContent): LabelBuilder {
    this._text = text;
    return this.self();
  }

  width(width: TextSize): LabelBuilder {
    this._text.width = width;
    return this.self();
  }

  height(height: TextSize): LabelBuilder {
    this._text.height = height;
    return this.self();
  }

  plainText(plainText: string): LabelBuilder {
    this._text.plainText = plainText;
    return this.self();
  }

  padding(padding: number): LabelBuilder {
    this._text.style.padding = padding;
    return this.self();
  }

  fontFamily(fontFamily: string): LabelBuilder {
    this._text.style.fontFamily = fontFamily;
    return this.self();
  }

  fontSize(fontSize: number): LabelBuilder {
    this._text.style.fontSize = fontSize;
    return this.self();
  }

  fontWeight(fontWeight: number): LabelBuilder {
    this._text.style.fontWeight = fontWeight;
    return this.self();
  }

  textAlign(textAlign: "LEFT" | "CENTER" | "RIGHT"): LabelBuilder {
    this._text.style.textAlign = textAlign;
    return this.self();
  }

  textAlignVertical(
    textAlignVertical: "BOTTOM" | "MIDDLE" | "TOP",
  ): LabelBuilder {
    this._text.style.textAlignVertical = textAlignVertical;
    return this.self();
  }

  fillColor(fillColor: string): LabelBuilder {
    this._text.style.fillColor = fillColor;
    return this.self();
  }

  fillOpacity(fillOpacity: number): LabelBuilder {
    this._text.style.fillOpacity = fillOpacity;
    return this.self();
  }

  strokeColor(strokeColor: string): LabelBuilder {
    this._text.style.strokeColor = strokeColor;
    return this.self();
  }

  strokeOpacity(strokeOpacity: number): LabelBuilder {
    this._text.style.strokeOpacity = strokeOpacity;
    return this.self();
  }

  strokeWidth(strokeWidth: number): LabelBuilder {
    this._text.style.strokeWidth = strokeWidth;
    return this.self();
  }

  lineHeight(lineHeight: number): LabelBuilder {
    this._text.style.lineHeight = lineHeight;
    return this.self();
  }

  style(style: LabelStyle): LabelBuilder {
    this._style = style;
    return this.self();
  }

  backgroundColor(backgroundColor: string): LabelBuilder {
    this._style.backgroundColor = backgroundColor;
    return this.self();
  }

  backgroundOpacity(backgroundOpacity: number): LabelBuilder {
    this._style.backgroundOpacity = backgroundOpacity;
    return this.self();
  }

  cornerRadius(cornerRadius: number): LabelBuilder {
    this._style.cornerRadius = cornerRadius;
    return this.self();
  }

  pointerWidth(pointerWidth: number): LabelBuilder {
    this._style.pointerWidth = pointerWidth;
    return this.self();
  }

  pointerHeight(pointerHeight: number): LabelBuilder {
    this._style.pointerHeight = pointerHeight;
    return this.self();
  }

  pointerDirection(
    pointerDirection: "UP" | "DOWN" | "LEFT" | "RIGHT",
  ): LabelBuilder {
    this._style.pointerDirection = pointerDirection;
    return this.self();
  }

  build(): Label {
    return {
      ...this._item,
      type: "LABEL",
      text: this._text,
      style: this._style,
    };
  }
}
