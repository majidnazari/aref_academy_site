import { SessionsStatusType } from "./SessionsStatusType";

export class Session {
  session_id!: number;
  status!: SessionsStatusType;
  start_date!: string;
}
