import { Session } from "./Session.dto";
export class JuryDto {
  id!: string;
  student_id!: number;
  sessions!: Session[];
  student_status!:
    | "ok"
    | "refused"
    | "fired"
    | "financial_pending"
    | "forbidden"
    | "fired_pending"
    | "refused_pending";
  student!: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
