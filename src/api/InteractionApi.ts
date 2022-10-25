import { enablePatches, produceWithPatches } from "immer";
import MessageBus from "../messages/MessageBus";
import {
  DispatchInteractionUpdate,
  ItemInteraction,
  ItemInteractionManager,
  StopInteraction,
} from "../types/Interaction";

enablePatches();

class InteractionApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async startItemInteraction(
    baseState: ItemInteraction,
  ): Promise<ItemInteractionManager> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_INTERACTION_START_ITEM_INTERACTION",
      { baseState },
    );

    let prev = baseState;
    const dispatcher: DispatchInteractionUpdate<ItemInteraction> = (update) => {
      const [next, patches] = produceWithPatches(prev, update);
      prev = next;
      this.messageBus.send("OBR_INTERACTION_UPDATE_ITEM_INTERACTION", {
        id,
        patches,
      });
      return next;
    };

    const stop: StopInteraction = () => {
      this.messageBus.send("OBR_INTERACTION_STOP_ITEM_INTERACTION", { id });
    };

    return [dispatcher, stop];
  }
}

export default InteractionApi;
