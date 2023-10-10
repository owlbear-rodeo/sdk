import { enablePatches, produceWithPatches } from "immer";
import MessageBus from "../messages/MessageBus";
import { Item } from "../types";
import {
  DispatchInteractionUpdate,
  InteractionManager,
  StopInteraction,
} from "../types/Interaction";

enablePatches();

class InteractionApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async startItemInteraction<S extends Item | Item[]>(
    baseState: S,
    updateAttachments = true,
  ): Promise<InteractionManager<S>> {
    const { id } = await this.messageBus.sendAsync<{ id: string }>(
      "OBR_INTERACTION_START_ITEM_INTERACTION",
      { baseState, updateAttachments },
    );

    let prev = baseState;
    const dispatcher: DispatchInteractionUpdate<S> = (update) => {
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
