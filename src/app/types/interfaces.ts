export interface DropdownOption {
  id: number;
  name: string;
  value?: string;
}

export interface ScheduleItem {
  room: string;
  program: string;
  day: string;
  period: number | string;
  subject_id: string;
  room_id?: string;
  teacher_name?: string;
}