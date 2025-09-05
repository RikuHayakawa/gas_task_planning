import { DayOfWeek } from "../value-objects/DayOfWeek";

export type WEEKLY_SCHEDULE_ACTIVITY =
  | "学習"
  | "インターン"
  | "睡眠"
  | "その他";

const LEARNING_IDENTIFIER = "学習";
const LEARNING_SLOT = 1;

export class DailySchedule {
  private _availableHour: number;

  constructor(
    public readonly dayOfWeek: DayOfWeek,
    public timeline: { [hour: number]: WEEKLY_SCHEDULE_ACTIVITY }
  ) {
    if (dayOfWeek.toNumber() < 0 || dayOfWeek.toNumber() > 6) {
      throw new Error("dayOfWeek must be 0~6");
    }
    if (Object.keys(timeline).length !== 24) {
      throw new Error("timeline must have 24 hours");
    }
    this._availableHour = Object.values(timeline).reduce(
      (sum, a) => sum + (a === LEARNING_IDENTIFIER ? LEARNING_SLOT : 0),
      0
    );
  }

  get availableHour(): number {
    return this.availableHour;
  }

  equals(other: DailySchedule): boolean {
    return this.dayOfWeek === other.dayOfWeek;
  }
}
