import { v4 as uuid } from "uuid";
import PlayerApi from "../api/PlayerApi.js";
import { AttachmentBehavior, Item, Layer } from "../types/items/Item.js";
import { Metadata } from "../types/Metadata.js";
import { Vector2 } from "../types/Vector2.js";

// Shim the item to remove readonly properties
type BuilderItem = Omit<Item, "id" | "lastModified" | "lastModifiedUserId"> & {
  id: string;
  lastModified: string;
  lastModifiedUserId: string;
};

export abstract class GenericItemBuilder<B extends GenericItemBuilder<B>> {
  protected _item: BuilderItem;

  constructor(player: PlayerApi) {
    this._item = {
      createdUserId: player.id,
      id: uuid(),
      name: "Item",
      zIndex: Date.now(),
      lastModified: new Date().toISOString(),
      lastModifiedUserId: player.id,
      locked: false,
      metadata: {},
      position: { x: 0, y: 0 },
      rotation: 0,
      scale: { x: 1, y: 1 },
      type: "ITEM",
      visible: true,
      layer: "POPOVER",
    };
  }

  createdUserId(createdUserId: string): B {
    this._item.createdUserId = createdUserId;
    return this.self();
  }

  id(id: string): B {
    this._item.id = id;
    return this.self();
  }

  name(name: string): B {
    this._item.name = name;
    return this.self();
  }

  description(description: string): B {
    this._item.description = description;
    return this.self();
  }

  lastModified(lastModified: string): B {
    this._item.lastModified = lastModified;
    return this.self();
  }

  zIndex(zIndex: number): B {
    this._item.zIndex = zIndex;
    return this.self();
  }

  lastModifiedUserId(lastModifiedUserId: string): B {
    this._item.lastModifiedUserId = lastModifiedUserId;
    return this.self();
  }

  locked(locked: boolean): B {
    this._item.locked = locked;
    return this.self();
  }

  metadata(metadata: Metadata): B {
    this._item.metadata = metadata;
    return this.self();
  }

  position(position: Vector2): B {
    this._item.position = position;
    return this.self();
  }

  rotation(rotation: number): B {
    this._item.rotation = rotation;
    return this.self();
  }

  scale(scale: Vector2): B {
    this._item.scale = scale;
    return this.self();
  }

  visible(visible: boolean): B {
    this._item.visible = visible;
    return this.self();
  }

  attachedTo(attachedTo: string): B {
    this._item.attachedTo = attachedTo;
    return this.self();
  }

  layer(layer: Layer): B {
    this._item.layer = layer;
    return this.self();
  }

  disableHit(disable: boolean): B {
    this._item.disableHit = disable;
    return this.self();
  }

  disableAutoZIndex(disable: boolean): B {
    this._item.disableAutoZIndex = disable;
    return this.self();
  }

  disableAttachmentBehavior(disable: AttachmentBehavior[]): B {
    this._item.disableAttachmentBehavior = disable;
    return this.self();
  }

  protected self(): B {
    // @ts-ignore
    return this;
  }
}
