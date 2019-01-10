export declare type RecurrenceUnit = "ONCE" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
declare type Schedule = {
    time_start: string;
    time_end?: string;
    recurrence_unit: RecurrenceUnit;
    recurrence_size: number;
};
export default Schedule;
