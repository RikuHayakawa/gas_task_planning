import {
  getWorkloadSheet,
  importWorkloadSheet,
} from "./spread-sheet/workload-sheet/usecase";

declare const global: any;

// 工数計画シートの形式バリデーションを実行
global.main = () => {
  console.log("=== 開始 ===");
  const sheet = getWorkloadSheet();
  if (!sheet) {
    return;
  }
  const importResult = importWorkloadSheet(sheet);
  for (const record of importResult?.records || []) {
    console.log(record);
  }
  console.log("=== 終了 ===");
};
