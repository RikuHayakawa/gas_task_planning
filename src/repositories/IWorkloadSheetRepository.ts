export interface ISpreadsheetRepository<T> {
  /**
   * スプレッドシートからデータを取得する
   */
  getSheetData(): T | null;
}
