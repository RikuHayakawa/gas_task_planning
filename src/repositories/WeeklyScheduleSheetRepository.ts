import { WEEKLY_SCHEDULE_SHEET_HEADER_NAMES } from "../domain/weekly_schedule/constants/weekly-schedule-sheet-header-names";
import { WEEKLY_SCHEDULE_SHEET_NAME } from "../domain/weekly_schedule/constants/weekly-schedule-sheet-name";
import { WeeklyScheduleObject } from "../domain/weekly_schedule/models/WeeklyScheduleObject";
import {
  WeeklyScheduleRecord,
  WeeklyScheduleActivity,
} from "../domain/weekly_schedule/models/WeeklyScheduleRecord";
import { validateWeeklyScheduleRecords } from "../domain/weekly_schedule/validation/validateRecords";
import { ISpreadsheetRepository } from "./ISpreadsheetRepository";

export class WeeklyScheduleSheetRepository
  implements ISpreadsheetRepository<WeeklyScheduleObject>
{
  /**
   * スプレッドシートからWeeklyScheduleObjectを取得
   */
  getSheetData(): WeeklyScheduleObject | null {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    try {
      const sheet = spreadsheet.getSheetByName(WEEKLY_SCHEDULE_SHEET_NAME);
      if (!sheet) {
        Logger.log(
          `エラー: 「${WEEKLY_SCHEDULE_SHEET_NAME}」シートが見つかりません`
        );
        return null;
      }
      const headers = sheet.getRange(1, 1, 1, 8).getValues()[0];
      if (
        !headers.every(
          (header, i) => header === WEEKLY_SCHEDULE_SHEET_HEADER_NAMES[i]
        )
      ) {
        Logger.log(
          `エラー: 「${WEEKLY_SCHEDULE_SHEET_NAME}」シートのヘッダーが不正です`
        );
        return null;
      }
      // 2行目以降をデータとして取得
      const startRow = 2;
      const numRows = sheet.getLastRow() - 1;
      if (numRows <= 0) return { records: [] };
      const values = sheet.getRange(startRow, 1, numRows, 8).getValues();
      // dayjsのweek番号（月曜=1, ... 土曜=6, 日曜=0）に合わせて順序を[1,2,3,4,5,6,0]に
      const weekOrder = [1, 2, 3, 4, 5, 6, 0];
      const records: WeeklyScheduleRecord[] = weekOrder.map((week) => {
        const timeline: { [key: number]: WeeklyScheduleActivity } = {};
        for (let hour = 0; hour < values.length; hour++) {
          timeline[hour] = values[hour][week === 0 ? 7 : week];
        }
        return {
          week,
          timeline,
        };
      });
      const validation = validateWeeklyScheduleRecords(records);
      if (validation !== true) {
        Logger.log("レコードバリデーションエラー: " + validation.join(", "));
        return null;
      }
      return { records };
    } catch (error) {
      throw new Error(`エラー: シートの取得に失敗しました - ${error}`);
    }
  }
}
