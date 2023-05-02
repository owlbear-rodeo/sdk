import MessageBus from "../messages/MessageBus";
import { Theme } from "../types/Theme";

class ThemeApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async getTheme(): Promise<Theme> {
    const { theme } = await this.messageBus.sendAsync<{ theme: Theme }>(
      "OBR_THEME_GET_THEME",
      {},
    );
    return theme;
  }

  onChange(callback: (theme: Theme) => void) {
    const handleChange = (data: { theme: Theme }) => {
      callback(data.theme);
    };
    this.messageBus.send("OBR_THEME_SUBSCRIBE", {});
    this.messageBus.on("OBR_THEME_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_THEME_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_THEME_EVENT_CHANGE", handleChange);
    };
  }
}

export default ThemeApi;
