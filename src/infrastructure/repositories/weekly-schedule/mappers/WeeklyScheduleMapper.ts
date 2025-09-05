import {
  DailySchedule,
  WEEKLY_SCHEDULE_ACTIVITY,
} from "../../../../domain/weekly-schedule/entities/DailySchedule";
import { DayOfWeek } from "../../../../domain/weekly-schedule/value-objects/DayOfWeek";

export class WeeklyScheduleMapper {
  static toDayOfWeekValueObjects(
    headerName: string,
    rowData: string[]
  ): DailySchedule[] {
    const dayOfWeek = DayOfWeek.fromString(headerName);
    const timeline: { [key: number]: WEEKLY_SCHEDULE_ACTIVITY } = {};

    rowData.map((data, hour) => {
      timeline[hour] = data as WEEKLY_SCHEDULE_ACTIVITY;
    });
    return [new DailySchedule(dayOfWeek, timeline)];
  }
}
