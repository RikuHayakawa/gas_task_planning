import { ISpreadsheetRepository } from "../repositories/ISpreadsheetRepository";

export class SheetUseCase<T> {
  constructor(private repository: ISpreadsheetRepository<T>) {}

  getSheetData(): T | null {
    return this.repository.getSheetData();
  }

  // 他のユースケースメソッドもここに追加可能
}
