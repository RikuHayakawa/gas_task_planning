import { DayOfWeek } from "../value-objects/DayOfWeek";
import { DailySchedule } from "./DailySchedule";

// note: 第一週などで識別する可能性があるため、entityとして定義
export class WeeklyScheduleCollection {
  public readonly days: DailySchedule[];

  constructor(records: DailySchedule[]) {
    this.days = records;
  }

  /**
   * 曜日ごとの学習可能時間配列 [日, 月, ...]
   */
  get availableHoursPerDay(): number[] {
    return this.days.map((d) => d.availableHour);
  }

  /**
   * 週全体の合計学習可能時間
   */
  get totalAvailableHours(): number {
    return this.days.reduce((sum, d) => sum + d.availableHour, 0);
  }

  /**
   * 任意の曜日のDayOfWeekValueObjectを取得
   */
  getDay(dayOfWeek: DayOfWeek): DailySchedule | undefined {
    return this.days.find((d) => d.dayOfWeek.equals(dayOfWeek));
  }
}
