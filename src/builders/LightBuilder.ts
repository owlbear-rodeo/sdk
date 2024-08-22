import PlayerApi from "../api/PlayerApi";
import { Light } from "../types/items/Light";
import { GenericItemBuilder } from "./GenericItemBuilder";

export class LightBuilder extends GenericItemBuilder<LightBuilder> {
  private _sourceRadius: number;
  private _attenuationRadius: number;
  private _falloff: number;
  private _innerAngle: number;
  private _outerAngle: number;

  constructor(player: PlayerApi) {
    super(player);
    this._sourceRadius = 50;
    this._attenuationRadius = 12 * 150;
    this._falloff = 1.0;
    this._innerAngle = 360;
    this._outerAngle = 360;
    this._item.name = "Light";
    this._item.layer = "FOG";
    this._item.zIndex = 0;
    this._item.disableAutoZIndex = true;
  }

  sourceRadius(sourceRadius: number): LightBuilder {
    this._sourceRadius = sourceRadius;
    return this.self();
  }

  attenuationRadius(attenuationRadius: number): LightBuilder {
    this._attenuationRadius = attenuationRadius;
    return this.self();
  }

  falloff(falloff: number): LightBuilder {
    this._falloff = falloff;
    return this.self();
  }

  innerAngle(innerAngle: number): LightBuilder {
    this._innerAngle = innerAngle;
    return this.self();
  }

  outerAngle(outerAngle: number): LightBuilder {
    this._outerAngle = outerAngle;
    return this.self();
  }

  build(): Light {
    return {
      ...this._item,
      type: "LIGHT",
      sourceRadius: this._sourceRadius,
      attenuationRadius: this._attenuationRadius,
      falloff: this._falloff,
      innerAngle: this._innerAngle,
      outerAngle: this._outerAngle,
    };
  }
}
