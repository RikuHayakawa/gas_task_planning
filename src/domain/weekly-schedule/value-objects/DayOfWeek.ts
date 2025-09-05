export class DayOfWeek {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static fromNumber(value: number): DayOfWeek {
    if (value < 0 || value > 6) {
      throw new Error("Invalid day of week");
    }
    return new DayOfWeek(value);
  }

  static fromString(value: string): DayOfWeek {
    const index = ["日", "月", "火", "水", "木", "金", "土"].indexOf(value);
    if (index === -1) {
      throw new Error("Invalid day of week");
    }
    return new DayOfWeek(index);
  }

  static validateString(value: string): boolean {
    return ["日", "月", "火", "水", "木", "金", "土"].includes(value);
  }

  toNumber(): number {
    return this.value;
  }

  toString(): string {
    return ["日", "月", "火", "水", "木", "金", "土"][this.value];
  }

  equals(other: DayOfWeek): boolean {
    return this.value === other.value;
  }

  static get SUNDAY(): DayOfWeek { return new DayOfWeek(0); }
  static get MONDAY(): DayOfWeek { return new DayOfWeek(1); }
  static get TUESDAY(): DayOfWeek { return new DayOfWeek(2); }
  static get WEDNESDAY(): DayOfWeek { return new DayOfWeek(3); }
  static get THURSDAY(): DayOfWeek { return new DayOfWeek(4); }
  static get FRIDAY(): DayOfWeek { return new DayOfWeek(5); }
  static get SATURDAY(): DayOfWeek { return new DayOfWeek(6); }
}
