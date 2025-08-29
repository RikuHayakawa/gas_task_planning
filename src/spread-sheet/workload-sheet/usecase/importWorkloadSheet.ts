import { WorkloadSheet } from "../model/WorkloadSheet";
import { validateRecords } from "../validation/validateRecords";

export function importWorkloadSheet(
  sheet: GoogleAppsScript.Spreadsheet.Sheet
): WorkloadSheet | null {
  // 2行目以降をデータとして取得
  const startRow = 2;
  const numRows = sheet.getLastRow() - 1;
  if (numRows <= 0) return { records: [] };
  const values = sheet.getRange(startRow, 1, numRows, 10).getValues();
  const records = values.map((row, i) => ({
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
  if (!validateRecords(records)) {
    Logger.log("レコードバリデーションエラー");
    return null;
  }
  return { records };
}
