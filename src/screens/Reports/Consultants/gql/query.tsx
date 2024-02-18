import { gql } from '@apollo/client'

export const GET_CONSULTANT_REPORT = gql`
  query GET_CONSULTANT_DEFINITION_DETAILS_GENERAL_REPORT(
    $consultant_id: Int
    $session_date_from: String
    $session_date_to: String
    $student_id: Int
    $education_level: Int
  ) {
    getConsultantDefinitionDetailsGenerealReport(
      consultant_id: $consultant_id
      session_date_from: $session_date_from
      session_date_to: $session_date_to
      student_id: $student_id
      education_level: $education_level
    ) {
      consultant_fullname
      total_consultant_students
      total_consultant_definition

      total_student_present_hours
      total_student_present

      total_student_absence_hours
      total_student_absence

      total_student_delay_hours
      total_student_delay

      total_consultant_obligation_hours
      total_consultant_present_hours
      total_consultant_absence_hours
      total_consultant_earlier_hours

      details {
        id
        consultant_id
        student_id
        branch_class_room_id
        consultant_test_id
        user_id
        start_hour
        end_hour
        session_date
        student_status
        consultant_status
        session_status
        absent_present_description
        step
        consultant {
          id
          first_name
          last_name
        }
        user {
          id
          first_name
          last_name
        }
      }
    }
  }
`

export const GET_CONSULTANTS = gql`
  query GET_ALL_CONSULTANT($first: Int!, $page: Int) {
    getConsultants(first: $first, page: $page) {
      data {
        id
        first_name
        last_name
      }
    }
  }
`

export const GET_CONSULTANT_FINANCIAL_REPORT = gql`
  query GET_CONSULTANT_FINANCIAL_REPORT(
    $date_from: String
    $date_to: String
    $consultant_id: Int
    $description: String
    $financial_refused_status: FinancialRefusedStatus
    $financial_status: FinancialStatus
    $manager_status: ManagerStatus
    $student_id: Int
    $student_status: StudentStatusConsultantFinancial
    $total_present: Int
    $first: Int!
    $page: Int
  ) {
    getConsultantFinancials(
      date_from: $date_from
      date_to: $date_to
      consultant_id: $consultant_id
      description: $description
      financial_refused_status: $financial_refused_status
      financial_status: $financial_status
      manager_status: $manager_status
      student_id: $student_id
      student_status: $student_status
      total_present: $total_present
      first: $first
      page: $page
    ) {
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        perPage
        total
      }
      data {
        id
        student_id
        user_id_creator
        branch_id
        branch {
          id
          name
        }
        consultant_id
        consultant {
          id
          first_name
          last_name
        }
        year_id
        manager_status
        financial_status
        student_status
        financial_refused_status
        user_id_manager
        user_id_financial
        user_id_student_status
        description
        financial_status_updated_at
      }
    }
  }
`

export const CONSULTANT_REPORT = gql`
  query GET_CONSULTANT_REPORT(
    $consultant_id: Int
    $static_date_from: String
    $static_date_to: String
    $sum_students_major_humanities: Int
    $sum_students_major_experimental: Int
    $sum_students_major_mathematics: Int
    $sum_students_major_art: Int
    $sum_students_major_other: Int
    $sum_students_education_level_6: Int
    $sum_students_education_level_7: Int
    $sum_students_education_level_8: Int
    $sum_students_education_level_9: Int
    $sum_students_education_level_10: Int
    $sum_students_education_level_11: Int
    $sum_students_education_level_12: Int
    $sum_students_education_level_13: Int
    $sum_students_education_level_14: Int
    $sum_is_defined_consultant_session: Int
    $sum_is_defined_consultant_session_in_minutes: Int
    $sum_is_filled_consultant_session: Int
    $sum_is_filled_consultant_session_in_minutes: Int
    $sum_student_status_absent: Int
    $sum_student_status_present: Int
    $sum_student_status_no_action: Int
    $sum_student_status_dellay5: Int
    $sum_student_status_dellay10: Int
    $sum_student_status_dellay15: Int
    $sum_student_status_dellay15more: Int
    $sum_session_status_no_action: Int
    $sum_session_status_earlier_5min_finished: Int
    $sum_session_status_earlier_10min_finished: Int
    $sum_session_status_earlier_15min_finished: Int
    $sum_session_status_earlier_15min_more_finished: Int
    $sum_session_status_later_5min_started: Int
    $sum_session_status_later_10min_started: Int
    $sum_session_status_later_15min_started: Int
    $sum_session_status_later_15min_more_started: Int
    $sum_consultant_status_no_action: Int
    $sum_consultant_status_absent: Int
    $sum_consultant_status_present: Int
    $sum_consultant_status_dellay5: Int
    $sum_consultant_status_dellay10: Int
    $sum_consultant_status_dellay15: Int
    $sum_consultant_status_dellay15more: Int
    $sum_compensatory_meet_1: Int
    $sum_single_meet_1: Int
    $sum_remote_1: Int
    $sum_financial_manager_status_approved: Int
    $sum_financial_manager_status_pending: Int
    $sum_financial_financial_status_approved: Int
    $sum_financial_financial_status_pending: Int
    $sum_financial_financial_status_semi_approved: Int
    $sum_financial_student_status_ok: Int
    $sum_financial_student_status_refused: Int
    $sum_financial_student_status_fired: Int
    $sum_financial_student_status_financial_pending: Int
    $sum_financial_student_status_fire_pending: Int
    $sum_financial_student_status_refuse_pending: Int
    $sum_financial_financial_refused_status_not_returned: Int
    $sum_financial_financial_refused_status_returned: Int
    $sum_financial_financial_refused_status_noMoney: Int
  ) {
    getConsultantReport(
      consultant_id: $consultant_id

      static_date_from: $static_date_from
      static_date_to: $static_date_to

      sum_students_major_humanities: $sum_students_major_humanities
      sum_students_major_experimental: $sum_students_major_experimental
      sum_students_major_mathematics: $sum_students_major_mathematics
      sum_students_major_art: $sum_students_major_art
      sum_students_major_other: $sum_students_major_other

      sum_students_education_level_6: $sum_students_education_level_6
      sum_students_education_level_7: $sum_students_education_level_7
      sum_students_education_level_8: $sum_students_education_level_8
      sum_students_education_level_9: $sum_students_education_level_9
      sum_students_education_level_10: $sum_students_education_level_10
      sum_students_education_level_11: $sum_students_education_level_11
      sum_students_education_level_12: $sum_students_education_level_12
      sum_students_education_level_13: $sum_students_education_level_13
      sum_students_education_level_14: $sum_students_education_level_14

      sum_is_defined_consultant_session: $sum_is_defined_consultant_session
      sum_is_defined_consultant_session_in_minutes: $sum_is_defined_consultant_session_in_minutes

      sum_is_filled_consultant_session: $sum_is_filled_consultant_session
      sum_is_filled_consultant_session_in_minutes: $sum_is_filled_consultant_session_in_minutes

      sum_student_status_absent: $sum_student_status_absent
      sum_student_status_present: $sum_student_status_present
      sum_student_status_no_action: $sum_student_status_no_action

      sum_student_status_dellay5: $sum_student_status_dellay5
      sum_student_status_dellay10: $sum_student_status_dellay10
      sum_student_status_dellay15: $sum_student_status_dellay15
      sum_student_status_dellay15more: $sum_student_status_dellay15more

      sum_session_status_no_action: $sum_session_status_no_action
      sum_session_status_earlier_5min_finished: $sum_session_status_earlier_5min_finished
      sum_session_status_earlier_10min_finished: $sum_session_status_earlier_10min_finished
      sum_session_status_earlier_15min_finished: $sum_session_status_earlier_15min_finished
      sum_session_status_earlier_15min_more_finished: $sum_session_status_earlier_15min_more_finished

      sum_session_status_later_5min_started: $sum_session_status_later_5min_started
      sum_session_status_later_10min_started: $sum_session_status_later_10min_started
      sum_session_status_later_15min_started: $sum_session_status_later_15min_started
      sum_session_status_later_15min_more_started: $sum_session_status_later_15min_more_started

      sum_consultant_status_no_action: $sum_consultant_status_no_action
      sum_consultant_status_absent: $sum_consultant_status_absent
      sum_consultant_status_present: $sum_consultant_status_present

      sum_consultant_status_dellay5: $sum_consultant_status_dellay5
      sum_consultant_status_dellay10: $sum_consultant_status_dellay10
      sum_consultant_status_dellay15: $sum_consultant_status_dellay15
      sum_consultant_status_dellay15more: $sum_consultant_status_dellay15more

      sum_compensatory_meet_1: $sum_compensatory_meet_1
      sum_single_meet_1: $sum_single_meet_1
      sum_remote_1: $sum_remote_1

      sum_financial_manager_status_approved: $sum_financial_manager_status_approved
      sum_financial_manager_status_pending: $sum_financial_manager_status_pending

      sum_financial_financial_status_approved: $sum_financial_financial_status_approved
      sum_financial_financial_status_pending: $sum_financial_financial_status_pending
      sum_financial_financial_status_semi_approved: $sum_financial_financial_status_semi_approved

      sum_financial_student_status_ok: $sum_financial_student_status_ok
      sum_financial_student_status_refused: $sum_financial_student_status_refused
      sum_financial_student_status_fired: $sum_financial_student_status_fired
      sum_financial_student_status_financial_pending: $sum_financial_student_status_financial_pending
      sum_financial_student_status_fire_pending: $sum_financial_student_status_fire_pending
      sum_financial_student_status_refuse_pending: $sum_financial_student_status_refuse_pending

      sum_financial_financial_refused_status_not_returned: $sum_financial_financial_refused_status_not_returned
      sum_financial_financial_refused_status_returned: $sum_financial_financial_refused_status_returned
      sum_financial_financial_refused_status_noMoney: $sum_financial_financial_refused_status_noMoney
    ) {
      consultant_id
      consultant_statics {
        consultant_id
        sum_students_registered

        sum_students_major_humanities
        sum_students_major_experimental
        sum_students_major_mathematics
        sum_students_major_art
        sum_students_major_other

        sum_students_education_level_6
        sum_students_education_level_7
        sum_students_education_level_8
        sum_students_education_level_9
        sum_students_education_level_10
        sum_students_education_level_11
        sum_students_education_level_12
        sum_students_education_level_13
        sum_students_education_level_14

        sum_is_defined_consultant_session
        sum_is_defined_consultant_session_in_minutes
        sum_is_filled_consultant_session
        sum_is_filled_consultant_session_in_minutes

        sum_student_status_absent
        sum_student_status_present
        sum_student_status_no_action

        sum_student_status_dellay5
        sum_student_status_dellay10
        sum_student_status_dellay15
        sum_student_status_dellay15more

        sum_session_status_no_action
        sum_session_status_earlier_5min_finished
        sum_session_status_earlier_10min_finished
        sum_session_status_earlier_15min_finished
        sum_session_status_earlier_15min_more_finished

        sum_session_status_later_5min_started
        sum_session_status_later_10min_started
        sum_session_status_later_15min_started
        sum_session_status_later_15min_more_started

        sum_consultant_status_no_action
        sum_consultant_status_absent
        sum_consultant_status_present

        sum_consultant_status_dellay5
        sum_consultant_status_dellay10
        sum_consultant_status_dellay15
        sum_consultant_status_dellay15more

        sum_compensatory_meet_1
        sum_single_meet_1
        sum_remote_1

        sum_financial_manager_status_approved
        sum_financial_manager_status_pending
        sum_financial_financial_status_approved
        sum_financial_financial_status_pending
        sum_financial_financial_status_semi_approved

        sum_financial_student_status_ok
        sum_financial_student_status_refused
        sum_financial_student_status_fired
        sum_financial_student_status_financial_pending
        sum_financial_student_status_fire_pending
        sum_financial_student_status_refuse_pending

        sum_financial_financial_refused_status_not_returned
        sum_financial_financial_refused_status_returned
        sum_financial_financial_refused_status_noMoney
      }
    }
  }
`
