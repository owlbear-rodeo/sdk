import { Ruler, RulerStyle, RulerVariant } from "../types/items/Ruler";
import { Vector2 } from "../types/Vector2";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class RulerBuilder extends GenericItemBuilder<RulerBuilder> {
  private _startPosition: Vector2;
  private _endPosition: Vector2;
  private _measurement: string;
  private _style: RulerStyle;

  constructor() {
    super();
    this._startPosition = { x: 0, y: 0 };
    this._endPosition = { x: 0, y: 0 };
    this._measurement = "";
    this._item.layer = "RULER";
    this._item.name = "Ruler";
    this._style = {
      variant: "FILLED",
    };
  }

  startPosition(startPosition: Vector2): RulerBuilder {
    this._startPosition = startPosition;
    return this.self();
  }

  endPosition(endPosition: Vector2): RulerBuilder {
    this._endPosition = endPosition;
    return this.self();
  }

  measurement(measurement: string): RulerBuilder {
    this._measurement = measurement;
    return this.self();
  }

  variant(variant: RulerVariant): RulerBuilder {
    this._style.variant = variant;
    return this.self();
  }

  build(): Ruler {
    return {
      ...this._item,
      type: "RULER",
      startPosition: this._startPosition,
      endPosition: this._endPosition,
      measurement: this._measurement,
      style: this._style,
    };
  }
}
