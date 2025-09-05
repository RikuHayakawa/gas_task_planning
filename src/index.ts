import { WeeklyScheduleSheetRepository } from "./infrastructure/repositories/weekly-schedule/WeeklyScheduleSheetRepository";
import { WorkloadSheetRepository } from "./infrastructure/repositories/workload/WorkloadSheetRepository";
import { PlanningUseCase } from "./usecase/PlanningUseCase";

declare const global: any;

// 工数計画シートの形式バリデーションを実行
global.main = () => {
  console.log("=== 開始 ===");

  // 工数計画シートの取得
  const planningUseCase = new PlanningUseCase(
    new WorkloadSheetRepository(),
    new WeeklyScheduleSheetRepository()
  );

  // planningUseCase.logData();

  console.log("=== 終了 ===");
};
