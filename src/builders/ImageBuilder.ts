import { ImageContent } from "../types/items/ImageContent";
import { ImageGrid } from "../types/items/ImageGrid";
import {
  RichText,
  TextContent,
  TextContentType,
  TextItemType,
  TextSize,
} from "../types/items/TextContent";
import { Image } from "../types/items/Image";
import { GenericItemBuilder } from "./GenericItemBuilder";
import PlayerApi from "../api/PlayerApi";

export class ImageBuilder extends GenericItemBuilder<ImageBuilder> {
  private _image: ImageContent;
  private _grid: ImageGrid;
  private _text: TextContent;
  private _textItemType: TextItemType;

  constructor(player: PlayerApi, image: ImageContent, grid: ImageGrid) {
    super(player);
    this._image = image;
    this._grid = grid;
    this._item.name = "Image";
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
        textAlignVertical: "BOTTOM",
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
    this._textItemType = "LABEL";
  }

  text(text: TextContent): ImageBuilder {
    this._text = text;
    return this.self();
  }

  textItemType(textItemType: TextItemType): ImageBuilder {
    this._textItemType = textItemType;
    return this.self();
  }

  textWidth(width: TextSize): ImageBuilder {
    this._text.width = width;
    return this.self();
  }

  textHeight(height: TextSize): ImageBuilder {
    this._text.height = height;
    return this.self();
  }

  richText(richText: RichText): ImageBuilder {
    this._text.richText = richText;
    return this.self();
  }

  plainText(plainText: string): ImageBuilder {
    this._text.plainText = plainText;
    return this.self();
  }

  textType(textType: TextContentType): ImageBuilder {
    this._text.type = textType;
    return this.self();
  }

  textPadding(padding: number): ImageBuilder {
    this._text.style.padding = padding;
    return this.self();
  }

  fontFamily(fontFamily: string): ImageBuilder {
    this._text.style.fontFamily = fontFamily;
    return this.self();
  }

  fontSize(fontSize: number): ImageBuilder {
    this._text.style.fontSize = fontSize;
    return this.self();
  }

  fontWeight(fontWeight: number): ImageBuilder {
    this._text.style.fontWeight = fontWeight;
    return this.self();
  }

  textAlign(textAlign: "LEFT" | "CENTER" | "RIGHT"): ImageBuilder {
    this._text.style.textAlign = textAlign;
    return this.self();
  }

  textAlignVertical(
    textAlignVertical: "BOTTOM" | "MIDDLE" | "TOP",
  ): ImageBuilder {
    this._text.style.textAlignVertical = textAlignVertical;
    return this.self();
  }

  textFillColor(fillColor: string): ImageBuilder {
    this._text.style.fillColor = fillColor;
    return this.self();
  }

  textFillOpacity(fillOpacity: number): ImageBuilder {
    this._text.style.fillOpacity = fillOpacity;
    return this.self();
  }

  textStrokeColor(strokeColor: string): ImageBuilder {
    this._text.style.strokeColor = strokeColor;
    return this.self();
  }

  textStrokeOpacity(strokeOpacity: number): ImageBuilder {
    this._text.style.strokeOpacity = strokeOpacity;
    return this.self();
  }

  textStrokeWidth(strokeWidth: number): ImageBuilder {
    this._text.style.strokeWidth = strokeWidth;
    return this.self();
  }

  textLineHeight(lineHeight: number): ImageBuilder {
    this._text.style.lineHeight = lineHeight;
    return this.self();
  }

  build(): Image {
    return {
      ...this._item,
      type: "IMAGE",
      image: this._image,
      grid: this._grid,
      text: this._text,
      textItemType: this._textItemType,
    };
  }
}
