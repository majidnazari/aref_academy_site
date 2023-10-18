import { gql } from "@apollo/client";

export const CREATE_CONSULTANT_DEFINITION_DETAIL = gql`
  mutation CREATE_CONSULTANT_DEFINITION_DETAIL(
    $branch_class_room_id: Int
    $consultant_id: Int!
    $days: [DaysOfWeek]
    $end_hour: String!
    $start_hour: String!
    $step: Int!
    $week: Week
  ) {
    createConsultantDefinitionDetail(
      input: {
        branch_class_room_id: $branch_class_room_id
        consultant_id: $consultant_id
        days: $days
        end_hour: $end_hour
        start_hour: $start_hour
        step: $step
        week: $week
      }
    ) {
      id
    }
  }
`;

export const UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID = gql`
  mutation UPDATE_STUDENT_OF_CONSULTANTDEFINITIONDETAIL(
    $id: ID!
    $student_id: Int!
    $student_status: String
    $absent_present_description: String
  ) {
    updateConsultantDefinitionDetail(
      input: {
        id: $id
        student_id: $student_id
        student_status: $student_status
        absent_present_description: $absent_present_description
      }
    ) {
      id
      consultant_id
      student_id
      branch_class_room_id
      consultant_test_id
      user_id
      start_hour
      end_hour
      session_date
    }
  }
`;

export const UPDATE_CONSULTANT_FINANCIAL = gql`
  mutation UPDATE_CONSULTANT_FINANCIAL(
    $consultant_id: Int!
    $student_id: Int!
    $year_id: Int!
    $manager_status: ManagerStatus
    $branch_id: Int
    $consultant_definition_detail_id: Int
    $description: String
    $financial_refused_status: FinancialRefusedStatus
    $financial_status: FinancialStatus
    $student_status: StudentStatusConsultantFinancial
  ) {
    updateConsultantFinancial(
      input: {
        consultant_id: $consultant_id
        student_id: $student_id
        year_id: $year_id
        branch_id: $branch_id
        manager_status: $manager_status
        financial_status: $financial_status
        financial_refused_status: $financial_refused_status
        consultant_definition_detail_id: $consultant_definition_detail_id
        description: $description
        student_status: $student_status
      }
    ) {
      id
      year_id
      year {
        active
        name
      }
      branch_id
      branch {
        id
        name
      }
      student_id
      student {
        id
        first_name
        last_name
        is_academy_student
      }
      consultant_id
      consultant {
        id
        email
        first_name
        last_name
      }
      user_id_creator
      user {
        id
        first_name
        last_name
      }
      user_id_manager
      manager {
        id
        first_name
        last_name
      }
      user_id_financial
      financial {
        id
        first_name
        last_name
      }
      user_id_student_status
      consultant_definition_detail_id
      consultantDefinitionDetails {
        id
        start_hour
        end_hour
        session_date
      }
      description
      financial_status
      manager_status
      student_status
      financial_refused_status
      financial_status_updated_at
      user_id_student_status
      description
    }
  }
`;
