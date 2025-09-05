export interface ISpreadsheetRepository<T> {
  getSheetData(): T | null;
}