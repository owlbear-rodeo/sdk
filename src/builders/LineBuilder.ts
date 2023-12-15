import PlayerApi from "../api/PlayerApi.js";
import { Line, LineStyle } from "../types/items/Line.js";
import { Vector2 } from "../types/Vector2.js";
import { GenericItemBuilder } from "./GenericItemBuilder.js";

export class LineBuilder extends GenericItemBuilder<LineBuilder> {
  private _style: LineStyle;
  private _startPosition: Vector2;
  private _endPosition: Vector2;

  constructor(player: PlayerApi) {
    super(player);
    this._style = {
      strokeColor: "black",
      strokeOpacity: 1,
      strokeWidth: 5,
      strokeDash: [],
    };
    this._startPosition = { x: 0, y: 0 };
    this._endPosition = { x: 0, y: 0 };
    this._item.layer = "DRAWING";
    this._item.name = "Line";
  }

  style(style: LineStyle): LineBuilder {
    this._style = style;
    return this.self();
  }

  strokeColor(strokeColor: string): LineBuilder {
    this._style.strokeColor = strokeColor;
    return this.self();
  }

  strokeOpacity(strokeOpacity: number): LineBuilder {
    this._style.strokeOpacity = strokeOpacity;
    return this.self();
  }

  strokeWidth(strokeWidth: number): LineBuilder {
    this._style.strokeWidth = strokeWidth;
    return this.self();
  }

  strokeDash(strokeDash: number[]): LineBuilder {
    this._style.strokeDash = strokeDash;
    return this.self();
  }

  startPosition(startPosition: Vector2): LineBuilder {
    this._startPosition = startPosition;
    return this.self();
  }

  endPosition(endPosition: Vector2): LineBuilder {
    this._endPosition = endPosition;
    return this.self();
  }

  build(): Line {
    return {
      ...this._item,
      type: "LINE",
      startPosition: this._startPosition,
      endPosition: this._endPosition,
      style: this._style,
    };
  }
}
