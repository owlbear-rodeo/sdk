import { normalizeIconPaths } from "../common/normalizeIconPaths";
import MessageBus from "../messages/MessageBus";

class ActionApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async getWidth(): Promise<number | undefined> {
    const { width } = await this.messageBus.sendAsync<{
      width: number | undefined;
    }>("OBR_ACTION_GET_WIDTH", {});
    return width;
  }

  async setWidth(width: number): Promise<void> {
    await this.messageBus.sendAsync("OBR_ACTION_SET_WIDTH", { width });
  }

  async getHeight(): Promise<number | undefined> {
    const { height } = await this.messageBus.sendAsync<{
      height: number | undefined;
    }>("OBR_ACTION_GET_HEIGHT", {});
    return height;
  }

  async setHeight(height: number): Promise<void> {
    await this.messageBus.sendAsync("OBR_ACTION_SET_HEIGHT", { height });
  }

  async getBadgeText(): Promise<string | undefined> {
    const { badgeText } = await this.messageBus.sendAsync<{
      badgeText: string | undefined;
    }>("OBR_ACTION_GET_BADGE_TEXT", {});
    return badgeText;
  }

  async setBadgeText(badgeText: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_TEXT", { badgeText });
  }

  async getBadgeBackgroundColor(): Promise<string | undefined> {
    const { badgeBackgroundColor } = await this.messageBus.sendAsync<{
      badgeBackgroundColor: string | undefined;
    }>("OBR_ACTION_GET_BADGE_BACKGROUND_COLOR", {});
    return badgeBackgroundColor;
  }

  async setBadgeBackgroundColor(badgeBackgroundColor: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_BACKGROUND_COLOR", {
      badgeBackgroundColor,
    });
  }

  async getIcon(): Promise<string> {
    const { icon } = await this.messageBus.sendAsync<{
      icon: string;
    }>("OBR_ACTION_GET_ICON", {});
    return icon;
  }

  async setIcon(icon: string): Promise<void> {
    const data = normalizeIconPaths([{ icon }]);
    await this.messageBus.sendAsync("OBR_ACTION_SET_ICON", {
      icon: data[0].icon,
    });
  }

  async getTitle(): Promise<string> {
    const { title } = await this.messageBus.sendAsync<{
      title: string;
    }>("OBR_ACTION_GET_TITLE", {});
    return title;
  }

  async setTitle(title: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_ACTION_SET_TITLE", { title });
  }
}

export default ActionApi;