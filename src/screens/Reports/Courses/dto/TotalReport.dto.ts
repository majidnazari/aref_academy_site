export class TotalReportDto {
  avg_absent?: number;
  avg_dellay?: number;
  end_session!: string;
  id!: number;
  start_session!: string;
  teacher_name!: string;
  total_approved!: number;
  total_done_session?: any;
  total_fired!: number;
  total_noMoney!: number;
  total_noMoney_semi_pending!: number;
  total_pending!: number;
  total_refused!: number;
  total_session?: any;
  total_students!: number;
  total_transferred!: number;
  total_just_noMoney!: number;
  total_just_withMoney!: number;
}
