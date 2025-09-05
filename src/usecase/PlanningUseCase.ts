import { ISpreadsheetRepository } from "../domain/repositories/ISpreadsheetRepository";

export class PlanningUseCase<T, U> {
  private workloadData: T | null = null;
  private weeklyData: U | null = null;

  constructor(
    private workloadRepository: ISpreadsheetRepository<T>,
    private weeklyRepository: ISpreadsheetRepository<U>
  ) {
    this.loadData();
  }

  private loadData() {
    // this.workloadData = this.workloadRepository.getSheetData();
    this.weeklyData = this.weeklyRepository.getSheetData();
  }

  public logData() {
    console.log("=== 工数計画シート ===");
    if (Array.isArray(this.workloadData)) {
      for (const record of this.workloadData) {
        console.log(record);
      }
    }
    console.log("=== 週別学習計画シート ===");
    if (Array.isArray(this.weeklyData)) {
      for (const record of this.weeklyData) {
        console.log(record);
      }
    }
  }

  public isCompleted(): boolean {
    return this.workloadData !== null && this.weeklyData !== null;
  }
}
