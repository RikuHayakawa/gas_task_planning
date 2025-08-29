import { WorkloadSheetRepository } from "./repositories/WorkloadSheetRepository";
import { SheetUseCase } from "./usecase/getWorkloadSheetUseCase";

declare const global: any;

// 工数計画シートの形式バリデーションを実行
global.main = () => {
  console.log("=== 開始 ===");
  const repository = new WorkloadSheetRepository();
  const useCase = new SheetUseCase(repository);
  const sheetData = useCase.getSheetData();
  for (const record of sheetData?.records || []) {
    console.log(record);
  }
  console.log("=== 終了 ===");
};
