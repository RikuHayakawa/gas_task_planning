import { ISpreadsheetRepository } from "../../../domain/repositories/ISpreadsheetRepository";
import { WorkloadObject } from "../../../domain/workload/models/WorkloadObject";
import { WorkloadRecord } from "../../../domain/workload/models/WorkloadRecord";
import { validateRecords } from "../../../domain/workload/validation/validateRecords";
import { WORKLOAD_SHEET_HEADER_NAMES } from "./constants/workload-sheet-header-names";
import { WORKLOAD_SHEET_NAME } from "./constants/workload-sheet-name";

export class WorkloadSheetRepository
  implements ISpreadsheetRepository<WorkloadObject>
{
  /**
   * スプレッドシートからWorkloadObjectを取得
   */
  getSheetData(): WorkloadObject | null {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    try {
      const sheet = spreadsheet.getSheetByName(WORKLOAD_SHEET_NAME);
      if (!sheet) {
        Logger.log(`エラー: 「${WORKLOAD_SHEET_NAME}」シートが見つかりません`);
        return null;
      }
      const headers = sheet.getRange(1, 1, 1, 10).getValues()[0];
      if (
        !headers.every((header, i) => header === WORKLOAD_SHEET_HEADER_NAMES[i])
      ) {
        Logger.log(
          `エラー: 「${WORKLOAD_SHEET_NAME}」シートのヘッダーが不正です`
        );
        return null;
      }
      // 2行目以降をデータとして取得
      const startRow = 2;
      const numRows = sheet.getLastRow() - 1;
      if (numRows <= 0) return { records: [] };
      const values = sheet.getRange(startRow, 1, numRows, 10).getValues();
      const records: WorkloadRecord[] = values.map((row, i) => ({
        rowNumber: startRow + i,
        group: row[0],
        item: row[1],
        priority: row[2],
        startDate: row[3],
        endDate: row[4],
        period: Number(row[5]),
        frequency: row[6],
        workloadPerDay: Number(row[7]),
        totalWorkload: Number(row[8]),
        plannedTotalWorkload: Number(row[9]),
      }));
      const { filteredRecords, valid, reasons } = validateRecords(records);
      if (!valid) {
        throw new Error(reasons.join(", "));
      }
      return { records: filteredRecords };
    } catch (error) {
      throw new Error(`エラー: シートの取得に失敗しました - ${error}`);
    }
  }
}
