import { Session } from "./Session.dto";
export class JuryDto {
  id!: string;
  student_id!: number;
  sessions!: Session[];
  student!: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
