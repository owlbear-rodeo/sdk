import MessageBus from "../../messages/MessageBus.js";
import { ItemFilter } from "../../types/ItemFilter.js";
import { Item } from "../../types/items/Item.js";
import { enablePatches, produceWithPatches } from "immer";
// @ts-ignore
import { WritableDraft } from "immer/dist/internal";
import { BoundingBox } from "../../types/BoundingBox.js";

enablePatches();

class SceneItemsApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async getItems<ItemType extends Item>(
    filter?: ItemFilter<ItemType>,
  ): Promise<ItemType[]> {
    if (Array.isArray(filter)) {
      const { items } = await this.messageBus.sendAsync<{ items: ItemType[] }>(
        "OBR_SCENE_ITEMS_GET_ITEMS",
        { ids: filter },
      );
      return items;
    } else if (filter) {
      const { items } = await this.messageBus.sendAsync<{ items: ItemType[] }>(
        "OBR_SCENE_ITEMS_GET_ALL_ITEMS",
        {},
      );
      return items.filter(filter);
    } else {
      const { items } = await this.messageBus.sendAsync<{ items: ItemType[] }>(
        "OBR_SCENE_ITEMS_GET_ALL_ITEMS",
        {},
      );
      return items;
    }
  }

  private isItemArray(value: any): value is Item[] {
    return (
      Array.isArray(value) && value.every((item) => typeof item !== "string")
    );
  }

  async updateItems<ItemType extends Item>(
    filterOrItems: ItemFilter<ItemType> | ItemType[],
    update: (draft: WritableDraft<ItemType[]>) => void,
    updateAttachments = true,
  ) {
    let items: ItemType[];
    if (this.isItemArray(filterOrItems)) {
      items = filterOrItems;
    } else {
      items = await this.getItems(filterOrItems);
    }
    const [nextState, patches] = produceWithPatches(items, update);
    const nextUpdates: Partial<Item>[] = nextState.map((item) => ({
      id: item.id,
      type: item.type,
    }));
    // Use patches to get the partial update keys
    for (const patch of patches) {
      const [index, key] = patch.path;
      if (typeof index === "number" && typeof key === "string") {
        (nextUpdates as any)[index][key] = (nextState as any)[index][key];
      }
    }
    // Filter out any update without changes
    const updates = nextUpdates.filter(
      // Ensure that there are updates besides the default ID and type
      (update) => Object.keys(update).length > 2,
    );
    if (updates.length === 0) {
      return;
    }
    await this.messageBus.sendAsync("OBR_SCENE_ITEMS_UPDATE_ITEMS", {
      updates,
      updateAttachments,
    });
  }

  async addItems(items: Item[]) {
    await this.messageBus.sendAsync("OBR_SCENE_ITEMS_ADD_ITEMS", {
      items,
    });
  }

  async deleteItems(ids: string[]) {
    await this.messageBus.sendAsync("OBR_SCENE_ITEMS_DELETE_ITEMS", {
      ids,
    });
  }

  async getItemAttachments(ids: string[]): Promise<Item[]> {
    const { items } = await this.messageBus.sendAsync<{ items: Item[] }>(
      "OBR_SCENE_ITEMS_GET_ITEM_ATTACHMENTS",
      { ids },
    );
    return items;
  }

  async getItemBounds(ids: string[]): Promise<BoundingBox> {
    const { bounds } = await this.messageBus.sendAsync<{
      bounds: BoundingBox;
    }>("OBR_SCENE_ITEMS_GET_ITEM_BOUNDS", { ids });
    return bounds;
  }

  onChange(callback: (items: Item[]) => void) {
    const handleChange = (data: { items: Item[] }) => {
      callback(data.items);
    };
    this.messageBus.send("OBR_SCENE_ITEMS_SUBSCRIBE", {});
    this.messageBus.on("OBR_SCENE_ITEMS_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_SCENE_ITEMS_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_SCENE_ITEMS_EVENT_CHANGE", handleChange);
    };
  }
}

export default SceneItemsApi;
