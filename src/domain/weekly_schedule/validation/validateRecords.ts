import { WeeklyScheduleRecord } from "../models/WeeklyScheduleRecord";
import { WEEKLY_SCHEDULE_SHEET_HEADER_NAMES } from "../constants/weekly-schedule-sheet-header-names";

/**
 * 週別カレンダーのレコード配列をバリデーションする
 * @param records WeeklyScheduleRecord[]
 * @returns エラーがなければtrue、エラーがあればエラーメッセージ配列
 */
export function validateWeeklyScheduleRecords(
  records: WeeklyScheduleRecord[]
): true | string[] {
  const errors: string[] = [];

  records.forEach((record, rowIndex) => {
    // weekが0~6か
    if (typeof record.week !== "number" || record.week < 0 || record.week > 6) {
      errors.push(`${rowIndex + 1}件目: weekが0~6の数値ではありません`);
    }
    // timelineが0~23すべて持つか
    for (let hour = 0; hour < 24; hour++) {
      if (!(hour in record.timeline)) {
        errors.push(`${rowIndex + 1}件目: timelineに${hour}時がありません`);
      } else {
        const value = record.timeline[hour];
        if (
          value !== "学習" &&
          value !== "インターン" &&
          value !== "睡眠" &&
          value !== "その他"
        ) {
          errors.push(
            `${rowIndex + 1}件目: timeline[${hour}]の値が不正です: ${value}`
          );
        }
      }
    }
  });

  return errors.length === 0 ? true : errors;
}
