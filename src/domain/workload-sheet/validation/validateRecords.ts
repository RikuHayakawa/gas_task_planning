// レコード配列のバリデーション
import {
  validateWorkloadRecord,
  WorkloadRecord,
} from "../models/WorkloadRecord";
// --- WorkloadSheetRepositoryの使用例 ---
// import { WorkloadSheetRepository } from "../../../../../repositories/WorkloadSheetRepository";
// const repository = new WorkloadSheetRepository();
// const workloadSheet = repository.getWorkloadSheet();
// if (workloadSheet) {
//   // workloadSheet.records でレコード配列にアクセスできます
//   console.log(workloadSheet.records);
// } else {
//   // シート取得やバリデーションに失敗した場合
//   console.log("取得失敗");
// }
// --------------------------------------

export interface ValidationResult {
  valid: boolean;
  reasons: string[];
}

export function validateRecords(records: WorkloadRecord[]): ValidationResult {
  const reasons: string[] = [];
  records.forEach((record, idx) => {
    // 各種バリデーション
    const result = validateWorkloadRecord(record);
    if (!result.valid) {
      reasons.push(`row ${idx + 2}: ${result.reasons}`);
    }
  });
  if (reasons.length > 0) {
    reasons.forEach((r) => Logger.log(r));
    return { valid: false, reasons };
  }
  return { valid: true, reasons: [] };
}
