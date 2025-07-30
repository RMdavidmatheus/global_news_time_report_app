import type { ZonedDateTime } from "@internationalized/date";

export interface ScheduleBody {
  is_lunching: boolean;
  schedule_user: string;
}

export interface ScheduleTimeData {
    initialTime: string;
    endTime: string;
}

export const formatTimeToString = (time: ZonedDateTime): string => {
  const hours = time.hour.toString().padStart(2, "0");
  const minutes = time.minute.toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatTimeStringToHHMM = (timeString: string): string => {
  return timeString.substring(0, 5);
};

export const selectSchedule = (data: ScheduleTimeData): string => {
  switch (data.initialTime) {
    case "06:00":
      return "D";
    case "12:00":
      return "N";
    case "13:00":
      return "N";
    default:
      return "F";
  }
};
