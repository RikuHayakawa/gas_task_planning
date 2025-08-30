import { WeeklyScheduleSheetRepository } from "./repositories/WeeklyScheduleSheetRepository";
import { WorkloadSheetRepository } from "./repositories/WorkloadSheetRepository";
import { SheetUseCase } from "./usecase/getWorkloadSheetUseCase";

declare const global: any;

// 工数計画シートの形式バリデーションを実行
global.main = () => {
  console.log("=== 開始 ===");

  // 工数計画シートの取得
  const workloadRepository = new WorkloadSheetRepository();
  const workloadUseCase = new SheetUseCase(workloadRepository);
  const workloadSheetData = workloadUseCase.getSheetData();
  for (const record of workloadSheetData?.records || []) {
    console.log(record);
  }

  // 週別学習計画シートの取得
  const weeklyRepository = new WeeklyScheduleSheetRepository();
  const weeklyUseCase = new SheetUseCase(weeklyRepository);
  const weeklySheetData = weeklyUseCase.getSheetData();
  for (const record of weeklySheetData?.records || []) {
    console.log(record);
  }
  console.log("=== 終了 ===");
};
