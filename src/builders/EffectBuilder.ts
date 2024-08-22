import PlayerApi from "../api/PlayerApi";
import { BlendMode, Effect, EffectType, Uniform } from "../types/items/Effect";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class EffectBuilder extends GenericItemBuilder<EffectBuilder> {
  private _width: number;
  private _height: number;
  private _sksl: string;
  private _effectType: EffectType;
  private _uniforms: Uniform[];
  private _blendMode: BlendMode;

  constructor(player: PlayerApi) {
    super(player);
    this._item.name = "Effect";
    this._width = 0;
    this._height = 0;
    this._sksl = "";
    this._effectType = "VIEWPORT";
    this._uniforms = [];
    this._blendMode = "SRC_OVER";
  }

  width(width: number): EffectBuilder {
    this._width = width;
    return this.self();
  }

  height(height: number): EffectBuilder {
    this._height = height;
    return this.self();
  }

  sksl(sksl: string): EffectBuilder {
    this._sksl = sksl;
    return this.self();
  }

  effectType(effectType: EffectType): EffectBuilder {
    this._effectType = effectType;
    return this.self();
  }

  uniforms(uniforms: Uniform[]): EffectBuilder {
    this._uniforms = uniforms;
    return this.self();
  }

  blendMode(blendMode: BlendMode): EffectBuilder {
    this._blendMode = blendMode;
    return this.self();
  }

  build(): Effect {
    return {
      ...this._item,
      type: "EFFECT",
      width: this._width,
      height: this._height,
      sksl: this._sksl,
      effectType: this._effectType,
      uniforms: this._uniforms,
      blendMode: this._blendMode,
    };
  }
}
