import MessageBus from "../messages/MessageBus";
import { Player } from "../types";

class PartyApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async getPlayers(): Promise<Player[]> {
    const { players } = await this.messageBus.sendAsync<{ players: Player[] }>(
      "OBR_PARTY_GET_PLAYERS",
      {},
    );
    return players;
  }

  onChange(callback: (players: Player[]) => void) {
    const handleChange = (data: { players: Player[] }) => {
      callback(data.players);
    };
    this.messageBus.send("OBR_PARTY_SUBSCRIBE", {});
    this.messageBus.on("OBR_PARTY_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_PARTY_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_PARTY_EVENT_CHANGE", handleChange);
    };
  }
}

export default PartyApi;
