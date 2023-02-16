import MessageBus from "../messages/MessageBus";
import { Metadata } from "../types/Metadata";
import { Permission } from "../types/Permission";

class RoomApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  get id() {
    return this.messageBus.roomId;
  }

  async getPermissions(): Promise<Permission[]> {
    const { permissions } = await this.messageBus.sendAsync<{
      permissions: Permission[];
    }>("OBR_ROOM_GET_PERMISSIONS", {});
    return permissions;
  }

  async getMetadata(): Promise<Metadata> {
    const { metadata } = await this.messageBus.sendAsync<{
      metadata: Metadata;
    }>("OBR_ROOM_GET_METADATA", {});
    return metadata;
  }

  async setMetadata(update: Partial<Metadata>): Promise<void> {
    await this.messageBus.sendAsync("OBR_ROOM_SET_METADATA", { update });
  }

  onMetadataChange(callback: (metadata: Metadata) => void) {
    const handleChange = (data: { metadata: Metadata }) => {
      callback(data.metadata);
    };
    this.messageBus.send("OBR_ROOM_METADATA_SUBSCRIBE", {});
    this.messageBus.on("OBR_ROOM_METADATA_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_METADATA_ROOM_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_ROOM_METADATA_EVENT_CHANGE", handleChange);
    };
  }

  onPermissionsChange(callback: (permissions: Permission[]) => void) {
    const handleChange = (data: { permissions: Permission[] }) => {
      callback(data.permissions);
    };
    this.messageBus.send("OBR_ROOM_PERMISSIONS_SUBSCRIBE", {});
    this.messageBus.on("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_PERMISSIONS_ROOM_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", handleChange);
    };
  }
}

export default RoomApi;
