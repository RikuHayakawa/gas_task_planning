import { WeeklyScheduleMapper } from "./mappers/WeeklyScheduleMapper";

import { ISpreadsheetRepository } from "../../../domain/repositories/ISpreadsheetRepository";
import { DailySchedule } from "../../../domain/weekly-schedule/entities/DailySchedule";
import { WEEKLY_SCHEDULE_SHEET_NAME } from "./constants/weekly-schedule-sheet-name";
import { WEEKLY_SCHEDULE_SHEET_HEADER_NAMES } from "./constants/weekly-schedule-sheet-header-names";
import { DayOfWeek } from "../../../domain/weekly-schedule/value-objects/DayOfWeek";

export class WeeklyScheduleSheetRepository
  implements ISpreadsheetRepository<DailySchedule[]>
{
  /**
   * スプレッドシートからWeeklyScheduleObjectを取得
   */
  getSheetData(): DailySchedule[] | null {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    try {
      const sheet = spreadsheet.getSheetByName(WEEKLY_SCHEDULE_SHEET_NAME);
      if (!sheet) {
        Logger.log(
          `エラー: 「${WEEKLY_SCHEDULE_SHEET_NAME}」シートが見つかりません`
        );
        return null;
      }
      const headers: string[] = sheet.getRange(1, 1, 1, 8).getValues()[0];
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
      if (numRows <= 0) return [];
      const values = sheet.getRange(startRow, 1, numRows, 8).getValues();
      // dayjsのday()に合わせて週の順序を[1,2,3,4,5,6,0]（月~日）でデータを取得し、MapperでDailySchedule[]に変換
      const dailySchedules: DailySchedule[] = [];
      console.log(headers);
      headers
        .filter((header) => DayOfWeek.validateString(header))
        .forEach((weekName) => {
          console.log(weekName);
          const rowNumber = WEEKLY_SCHEDULE_SHEET_HEADER_NAMES.indexOf(
            weekName as (typeof WEEKLY_SCHEDULE_SHEET_HEADER_NAMES)[number]
          );
          const rowData = values.map((row) => row[rowNumber]);
          const schedules = WeeklyScheduleMapper.toDayOfWeekValueObjects(
            weekName,
            rowData
          );
          dailySchedules.push(...schedules);
        });
      return dailySchedules;
    } catch (error) {
      throw new Error(`エラー: 工数計画シートの取得に失敗しました - ${error}`);
    }
  }
}
