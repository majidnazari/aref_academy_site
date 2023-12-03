import { gql } from "@apollo/client";

export const GET_CONSULTANT_REPORT = gql`
  query GET_CONSULTANT_DEFINITION_DETAILS_GENERAL_REPORT(
    $consultant_id: Int
    $session_date_from: String
    $session_date_to: String
    $student_id: Int
  ) {
    getConsultantDefinitionDetailsGenerealReport(
      consultant_id: $consultant_id
      session_date_from: $session_date_from
      session_date_to: $session_date_to
      student_id: $student_id
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
`;

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
`;

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
`;
