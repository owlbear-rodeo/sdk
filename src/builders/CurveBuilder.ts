import { Curve, CurveStyle } from "../types/items/Curve";
import { Vector2 } from "../types/Vector2";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class CurveBuilder extends GenericItemBuilder<CurveBuilder> {
  private _points: Vector2[];
  private _style: CurveStyle;

  constructor() {
    super();
    this._points = [];
    this._style = {
      fillColor: "black",
      fillOpacity: 1,
      strokeColor: "white",
      strokeOpacity: 1,
      strokeWidth: 5,
      strokeDash: [],
      tension: 0.5,
    };
    this._item.name = "Curve";
    this._item.layer = "DRAWING";
  }

  points(points: Vector2[]): CurveBuilder {
    this._points = points;
    return this.self();
  }

  style(style: CurveStyle): CurveBuilder {
    this._style = style;
    return this.self();
  }

  fillColor(fillColor: string): CurveBuilder {
    this._style.fillColor = fillColor;
    return this.self();
  }

  fillOpacity(fillOpacity: number): CurveBuilder {
    this._style.fillOpacity = fillOpacity;
    return this.self();
  }

  strokeColor(strokeColor: string): CurveBuilder {
    this._style.strokeColor = strokeColor;
    return this.self();
  }

  strokeOpacity(strokeOpacity: number): CurveBuilder {
    this._style.strokeOpacity = strokeOpacity;
    return this.self();
  }

  strokeWidth(strokeWidth: number): CurveBuilder {
    this._style.strokeWidth = strokeWidth;
    return this.self();
  }

  strokeDash(strokeDash: number[]): CurveBuilder {
    this._style.strokeDash = strokeDash;
    return this.self();
  }

  tension(tension: number): CurveBuilder {
    this._style.tension = tension;
    return this.self();
  }

  build(): Curve {
    return {
      ...this._item,
      type: "CURVE",
      points: this._points,
      style: this._style,
    };
  }
}
