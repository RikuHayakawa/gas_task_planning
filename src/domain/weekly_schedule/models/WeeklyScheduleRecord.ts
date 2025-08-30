export type WeeklyScheduleActivity = "学習" | "インターン" | "睡眠" | "その他";

export type WeeklyScheduleTime = string;

export type WeeklyScheduleRecord = {
  week: number; // numbers from 0 (Sunday) to 6 (Saturday)
  timeline: { [key: number]: WeeklyScheduleActivity };
};
