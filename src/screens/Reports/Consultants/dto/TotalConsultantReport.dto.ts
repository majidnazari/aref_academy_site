export class TotalConsultantReport {
  consultant_id?: Number
  sum_students_registered?: Number

  sum_students_major_humanities?: Number
  sum_students_major_experimental?: Number
  sum_students_major_mathematics?: Number
  sum_students_major_art?: Number
  sum_students_major_other?: Number

  sum_students_education_level_6?: Number
  sum_students_education_level_7?: Number
  sum_students_education_level_8?: Number
  sum_students_education_level_9?: Number
  sum_students_education_level_10?: Number
  sum_students_education_level_11?: Number
  sum_students_education_level_12?: Number
  sum_students_education_level_13?: Number
  sum_students_education_level_14?: Number

  sum_is_defined_consultant_session?: Number
  sum_is_defined_consultant_session_in_minutes?: Number
  sum_is_filled_consultant_session?: Number
  sum_is_filled_consultant_session_in_minutes?: Number

  sum_student_status_absent?: Number
  sum_student_status_present?: Number
  sum_student_status_no_action?: Number

  sum_student_status_dellay5?: Number
  sum_student_status_dellay10?: Number
  sum_student_status_dellay15?: Number
  sum_student_status_dellay15more?: Number

  sum_session_status_no_action?: Number
  sum_session_status_earlier_5min_finished?: Number
  sum_session_status_earlier_10min_finished?: Number
  sum_session_status_earlier_15min_finished?: Number
  sum_session_status_earlier_15min_more_finished?: Number

  sum_session_status_later_5min_started?: Number
  sum_session_status_later_10min_started?: Number
  sum_session_status_later_15min_started?: Number
  sum_session_status_later_15min_more_started?: Number

  sum_consultant_status_no_action?: Number
  sum_consultant_status_absent?: Number
  sum_consultant_status_present?: Number

  sum_consultant_status_dellay5?: Number
  sum_consultant_status_dellay10?: Number
  sum_consultant_status_dellay15?: Number
  sum_consultant_status_dellay15more?: Number

  sum_compensatory_meet_1?: Number
  sum_single_meet_1?: Number
  sum_remote_1?: Number

  sum_financial_manager_status_approved?: Number
  sum_financial_manager_status_pending?: Number
  sum_financial_financial_status_approved?: Number
  sum_financial_financial_status_pending?: Number
  sum_financial_financial_status_semi_approved?: Number

  sum_financial_student_status_ok?: Number
  sum_financial_student_status_refused?: Number
  sum_financial_student_status_fired?: Number
  sum_financial_student_status_financial_pending?: Number
  sum_financial_student_status_fire_pending?: Number
  sum_financial_student_status_refuse_pending?: Number

  sum_financial_financial_refused_status_not_returned?: Number
  sum_financial_financial_refused_status_returned?: Number
  sum_financial_financial_refused_status_noMoney?: Number
}

export class ConsultantDefinitionDetail {
  id!: String
  consultant_id?: number
  student_id?: number
  branch_class_room_id?: number
  consultant_test_id?: number
  user_id?: number
  start_hour?: String
  end_hour?: String
  session_date?: Date
  student_status?: StudentStatus
  consultant_status?: StudentStatus
  session_status?: SessionStatus
  absent_present_description?: String
  test_description?: String
  step!: number
  consultant?: User
  user?: User
  // branchClassRoom: BranchClassRoom
}

export class User {
  id!: String
  group_id?: number
  branch_id?: number
  first_name?: String
  last_name?: String
  email?: String
}

export class StudentStatus {
  absent?: String
  present?: String
  no_action?: String
  dellay5?: String
  dellay10?: String
  dellay15?: String
  dellay15more?: String
}

export class SessionStatus {
  no_action?: String
  earlier_5min_finished?: String
  earlier_10min_finished?: String
  earlier_15min_finished?: String
  earlier_15min_more_finished?: String
  later_5min_started?: String
  later_10min_started?: String
  later_15min_started?: String
  later_15min_more_s?: String
}
