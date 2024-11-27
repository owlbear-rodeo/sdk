import MessageBus from "../../messages/MessageBus";
import {
  Grid,
  GridColor,
  GridLineType,
  GridMeasurement,
  GridScale,
  GridType,
} from "../../types/Grid";
import { Vector2 } from "../../types/Vector2";

class SceneGridApi {
  private messageBus: MessageBus;

  constructor(messageBus: MessageBus) {
    this.messageBus = messageBus;
  }

  async getDpi(): Promise<number> {
    const { dpi } = await this.messageBus.sendAsync<{ dpi: number }>(
      "OBR_SCENE_GRID_GET_DPI",
      {},
    );
    return dpi;
  }

  async getScale(): Promise<GridScale> {
    const scale = await this.messageBus.sendAsync<GridScale>(
      "OBR_SCENE_GRID_GET_SCALE",
      {},
    );
    return scale;
  }

  async setScale(scale: string): Promise<void> {
    await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_SCALE", { scale });
  }

  async getColor(): Promise<GridColor> {
    const { color } = await this.messageBus.sendAsync<{ color: GridColor }>(
      "OBR_SCENE_GRID_GET_COLOR",
      {},
    );
    return color;
  }

  async setColor(color: GridColor): Promise<void> {
    await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_COLOR", { color });
  }

  async getOpacity(): Promise<number> {
    const { opacity } = await this.messageBus.sendAsync<{ opacity: number }>(
      "OBR_SCENE_GRID_GET_OPACITY",
      {},
    );
    return opacity;
  }

  async setOpacity(opacity: number): Promise<void> {
    await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_OPACITY", { opacity });
  }

  async getType(): Promise<GridType> {
    const { type } = await this.messageBus.sendAsync<{ type: GridType }>(
      "OBR_SCENE_GRID_GET_TYPE",
      {},
    );
    return type;
  }

  async setType(type: GridType): Promise<void> {
    await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_TYPE", { type });
  }

  async getLineType(): Promise<GridLineType> {
    const { lineType } = await this.messageBus.sendAsync<{
      lineType: GridLineType;
    }>("OBR_SCENE_GRID_GET_LINE_TYPE", {});
    return lineType;
  }

  async setLineType(lineType: GridLineType) {
    await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_TYPE", {
      lineType,
    });
  }

  async getMeasurement(): Promise<GridMeasurement> {
    const { measurement } = await this.messageBus.sendAsync<{
      measurement: GridMeasurement;
    }>("OBR_SCENE_GRID_GET_MEASUREMENT", {});
    return measurement;
  }

  async setMeasurement(measurement: GridMeasurement) {
    await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_MEASUREMENT", {
      measurement,
    });
  }

  async getLineWidth(): Promise<number> {
    const { lineWidth } = await this.messageBus.sendAsync<{
      lineWidth: number;
    }>("OBR_SCENE_GRID_GET_LINE_WIDTH", {});
    return lineWidth;
  }

  async setLineWidth(lineWidth: number): Promise<void> {
    await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_WIDTH", {
      lineWidth,
    });
  }

  async snapPosition(
    position: Vector2,
    snappingSensitivity?: number,
    useCorners?: boolean,
    useCenter?: boolean,
  ): Promise<Vector2> {
    const { position: snapped } = await this.messageBus.sendAsync<{
      position: Vector2;
    }>("OBR_SCENE_GRID_SNAP_POSITION", {
      position,
      snappingSensitivity,
      useCorners,
      useCenter,
    });
    return snapped;
  }

  async getDistance(from: Vector2, to: Vector2): Promise<number> {
    const { distance } = await this.messageBus.sendAsync<{ distance: number }>(
      "OBR_SCENE_GRID_GET_DISTANCE",
      { from, to },
    );
    return distance;
  }

  onChange(callback: (grid: Grid) => void) {
    const handleChange = (data: { grid: Grid }) => {
      callback(data.grid);
    };
    this.messageBus.send("OBR_SCENE_GRID_SUBSCRIBE", {});
    this.messageBus.on("OBR_SCENE_GRID_EVENT_CHANGE", handleChange);
    return () => {
      this.messageBus.send("OBR_SCENE_GRID_UNSUBSCRIBE", {});
      this.messageBus.off("OBR_SCENE_GRID_EVENT_CHANGE", handleChange);
    };
  }
}

export default SceneGridApi;
