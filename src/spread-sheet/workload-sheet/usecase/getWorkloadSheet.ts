import { SHEET_HEADER_NAMES } from "../constants/sheet-header-names";
import { WORKLOAD_SHEET_NAME } from "../constants/sheet-name";
export function getWorkloadSheet(): GoogleAppsScript.Spreadsheet.Sheet | null {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  try {
    const sheet = spreadsheet.getSheetByName(WORKLOAD_SHEET_NAME);

    if (!sheet) {
      Logger.log(`エラー: 「${WORKLOAD_SHEET_NAME}」シートが見つかりません`);
      return null;
    }

    const headers = sheet.getRange(1, 1, 1, 10).getValues()[0];

    if (!headers.every((header, i) => header === SHEET_HEADER_NAMES[i])) {
      Logger.log(
        `エラー: 「${WORKLOAD_SHEET_NAME}」シートのヘッダーが不正です`
      );
      return null;
    }

    return sheet;
  } catch (error) {
    Logger.log(`エラー: シートの取得に失敗しました - ${error}`);
    return null;
  }
}
