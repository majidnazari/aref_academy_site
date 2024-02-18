export class TotalConsultantReport {
  consultant_id?: number
  sum_students_registered?: number

  sum_students_major_humanities?: number
  sum_students_major_experimental?: number
  sum_students_major_mathematics?: number
  sum_students_major_art?: number
  sum_students_major_other?: number

  sum_students_education_level_6?: number
  sum_students_education_level_7?: number
  sum_students_education_level_8?: number
  sum_students_education_level_9?: number
  sum_students_education_level_10?: number
  sum_students_education_level_11?: number
  sum_students_education_level_12?: number
  sum_students_education_level_13?: number
  sum_students_education_level_14?: number

  sum_is_defined_consultant_session?: number
  sum_is_defined_consultant_session_in_minutes?: number
  sum_is_filled_consultant_session?: number
  sum_is_filled_consultant_session_in_minutes?: number

  sum_student_status_absent?: number
  sum_student_status_present?: number
  sum_student_status_no_action?: number

  sum_student_status_dellay5?: number
  sum_student_status_dellay10?: number
  sum_student_status_dellay15?: number
  sum_student_status_dellay15more?: number

  sum_session_status_no_action?: number
  sum_session_status_earlier_5min_finished?: number
  sum_session_status_earlier_10min_finished?: number
  sum_session_status_earlier_15min_finished?: number
  sum_session_status_earlier_15min_more_finished?: number

  sum_session_status_later_5min_started?: number
  sum_session_status_later_10min_started?: number
  sum_session_status_later_15min_started?: number
  sum_session_status_later_15min_more_started?: number

  sum_consultant_status_no_action?: number
  sum_consultant_status_absent?: number
  sum_consultant_status_present?: number

  sum_consultant_status_dellay5?: number
  sum_consultant_status_dellay10?: number
  sum_consultant_status_dellay15?: number
  sum_consultant_status_dellay15more?: number

  sum_compensatory_meet_1?: number
  sum_single_meet_1?: number
  sum_remote_1?: number

  sum_financial_manager_status_approved?: number
  sum_financial_manager_status_pending?: number
  sum_financial_financial_status_approved?: number
  sum_financial_financial_status_pending?: number
  sum_financial_financial_status_semi_approved?: number

  sum_financial_student_status_ok?: number
  sum_financial_student_status_refused?: number
  sum_financial_student_status_fired?: number
  sum_financial_student_status_financial_pending?: number
  sum_financial_student_status_fire_pending?: number
  sum_financial_student_status_refuse_pending?: number

  sum_financial_financial_refused_status_not_returned?: number
  sum_financial_financial_refused_status_returned?: number
  sum_financial_financial_refused_status_noMoney?: number
}

export class AllTotalConsultantReport {
  consultant_id?: number
  consultant_statics?: TotalConsultantReport
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
