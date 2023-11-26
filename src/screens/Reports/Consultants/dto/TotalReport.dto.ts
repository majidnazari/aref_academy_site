export class TotalReportDtos{

    consultant_fullname?:String;
    total_consultant_students!: number;
    total_consultant_definition!:number;
    
    total_student_present!: number;
    total_student_present_hours!: number;
    total_student_absence!:number;
    total_student_absence_hours!: number;
    total_student_delay!:number;
    total_student_delay_hours!: number;   

    total_consultant_obligation_hours!: number;
    total_consultant_present_hours!: number;
    total_consultant_absence_hours!: number;
    total_consultant_earlier_hours!: number;

    details!: ConsultantDefinitionDetail[];
}

export class ConsultantDefinitionDetail{  
    id!: String;
    consultant_id?: number;
    student_id?: number;
    branch_class_room_id?: number;   
    consultant_test_id?: number;
    user_id?: number;
    start_hour?: String
    end_hour?: String
    session_date?: Date
    student_status?: StudentStatus;
    consultant_status?: StudentStatus;
    session_status?: SessionStatus;
    absent_present_description?: String;
    test_description?: String ;   
    step!: number;
    consultant?: User 
    user?: User 
   // branchClassRoom: BranchClassRoom 
}

export class User{
  id!: String; 
  group_id?: number;
  branch_id?: number;
  first_name?: String;
  last_name?: String ; 
  email?: String;
}

export class StudentStatus {
  absent?:String;
  present?:String;
  no_action?:String;
  dellay5?:String;
  dellay10?:String;
  dellay15?:String;
  dellay15more?:String;
}

export class SessionStatus {
  no_action?:String;
  earlier_5min_finished?:String;
  earlier_10min_finished?:String;
  earlier_15min_finished?:String;
  earlier_15min_more_finished?:String;
  later_5min_started?:String;
  later_10min_started?:String;
  later_15min_started?:String;
  later_15min_more_s?:String;
}