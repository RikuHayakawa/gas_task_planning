// 1行分の工数レコードの型とドメインロジック

export interface WorkloadRecord {
  rowNumber: number; // シート上の行番号
  group: string; // グループ
  item: string; // 項目
  priority: string; // 優先度
  startDate: string; // 開始日
  endDate: string; // 終了日
  period: number; // 期間 (日)
  frequency: string; // 頻度(n/7)
  workloadPerDay: number; // 単日工数
  totalWorkload: number; // 総工数 (h)
  plannedTotalWorkload: number; // 予定総工数
}

export function validateWorkloadRecord(record: WorkloadRecord): {
    valid: boolean;
    reasons: string;
} {
  // 必須項目チェック
  if (record.rowNumber == null) return { valid: false, reasons: "行番号が未設定" };
  if (!record.group || !record.item) return { valid: false, reasons: "グループまたは項目が未入力" };
  if (!record.startDate || !record.endDate) return { valid: false, reasons: "開始日または終了日が未入力" };
  // 数値項目のバリデーション
  if (record.period < 0) return { valid: false, reasons: "期間が0未満" };
  if (record.workloadPerDay < 0) return { valid: false, reasons: "単日工数が0未満" };
  if (record.totalWorkload < 0) return { valid: false, reasons: "総工数が0未満" };
  if (record.plannedTotalWorkload < 0) return { valid: false, reasons: "予定総工数が0未満" };
  return { valid: true, reasons: "" };
}
