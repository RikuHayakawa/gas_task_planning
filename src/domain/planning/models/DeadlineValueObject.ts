interface DeadlineValueObjectType {
  dueDate: Date;
  workload: number;
}

class DeadlineValueObject implements DeadlineValueObjectType {
  constructor(public readonly dueDate: Date, public readonly workload: number) {
    this.validateParams();
  }

  private validateParams(): void {
    if (!(this.dueDate instanceof Date) || isNaN(this.dueDate.getTime())) {
      throw new Error("Invalid due date");
    }
    if (typeof this.workload !== "number" || this.workload < 0) {
      throw new Error("Invalid workload");
    }
  }

  private validateCompleteness(): void {
    if (!this.dueDate || !this.workload) {
      throw new Error("Incomplete deadline");
    }
  }

  public toJSON(): DeadlineValueObjectType {
    return {
      dueDate: this.dueDate,
      workload: this.workload,
    };
  }
}
