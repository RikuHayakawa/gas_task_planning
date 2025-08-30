// レコード配列のバリデーション
import {
  validateWorkloadRecord,
  WorkloadRecord,
} from "../models/WorkloadRecord";

export interface ValidationResult {
  valid: boolean;
  reasons: string[];
  filteredRecords: WorkloadRecord[];
}

export function validateRecords(records: WorkloadRecord[]): ValidationResult {
  const reasons: string[] = [];
  const filteredRecords: WorkloadRecord[] = [];
  records.forEach((record: WorkloadRecord, idx: number) => {
    const result = validateWorkloadRecord(record);
    if (result.skip) {
      Logger.log(`row ${idx + 2}: ${result.reasons}`);
      return;
    }
    if (!result.valid) {
      reasons.push(`row ${idx + 2}: ${result.reasons}`);
    } else {
      filteredRecords.push(record);
    }
  });
  if (reasons.length > 0) {
    reasons.forEach((r) => Logger.log(r));
    return { valid: false, reasons, filteredRecords: [] };
  }
  return { valid: true, reasons: [], filteredRecords };
}
