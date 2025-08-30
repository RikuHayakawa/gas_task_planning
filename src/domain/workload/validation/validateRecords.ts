// レコード配列のバリデーション
import {
  validateWorkloadRecord,
  WorkloadRecord,
} from "../models/WorkloadRecord";

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
