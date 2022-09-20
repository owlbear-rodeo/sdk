import MessageBus from "../../messages/MessageBus";
import { ItemFilter } from "../../types/ItemFilter";
import { Item } from "../../types/items/Item";
import { enablePatches, produceWithPatches } from "immer";
import { WritableDraft } from "immer/dist/internal";

enablePatches();

class SceneItemsSharedApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async getItems<ItemType extends Item>(
    filter: ItemFilter<ItemType>,
  ): Promise<ItemType[]> {
    if (Array.isArray(filter)) {
      const { items } = await this.messageBus.sendAsync<{ items: ItemType[] }>(
        "OBR_SCENE_ITEMS_SHARED_GET_ITEMS",
        { ids: filter },
      );
      return items;
    } else {
      const { items } = await this.messageBus.sendAsync<{ items: ItemType[] }>(
        "OBR_SCENE_ITEMS_SHARED_GET_ALL_ITEMS",
        {},
      );
      return items.filter(filter);
    }
  }

  async updateItems<ItemType extends Item>(
    filter: ItemFilter<ItemType>,
    update: (draft: WritableDraft<ItemType[]>) => void,
  ) {
    const items = await this.getItems(filter);
    const [nextState, patches] = produceWithPatches(items, update);
    const updates: Record<string, any>[] = nextState.map((item) => ({
      id: item.id,
      type: item.type,
    }));
    // Use patches to get the partial update keys
    for (const patch of patches) {
      const [index, key] = patch.path;
      if (typeof index === "number" && typeof key === "string") {
        updates[index][key] = (nextState as any)[index][key];
      }
    }
    await this.messageBus.sendAsync("OBR_SCENE_ITEMS_SHARED_UPDATE_ITEMS", {
      updates,
    });
  }

  async addItems(items: Item[]) {
    await this.messageBus.sendAsync("OBR_SCENE_ITEMS_SHARED_ADD_ITEMS", {
      items,
    });
  }

  async deleteItems(ids: string[]) {
    await this.messageBus.sendAsync("OBR_SCENE_ITEMS_SHARED_DELETE_ITEMS", {
      ids,
    });
  }

  async getItemAttachments(ids: string[]): Promise<Item[]> {
    const { items } = await this.messageBus.sendAsync<{ items: Item[] }>(
      "OBR_SCENE_ITEMS_SHARED_GET_ITEM_ATTACHMENTS",
      { ids },
    );
    return items;
  }
}

export default SceneItemsSharedApi;
