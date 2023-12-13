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
    $consultant_status: String
    $session_status: String
    $absent_present_description: String
    $compensatory_meet: Boolean
    $single_meet: Boolean
    $remote: Boolean
    $compensatory_of_definition_detail_id: Int
    $compensatory_for_definition_detail_id: Int
  ) {
    updateConsultantDefinitionDetail(
      input: {
        id: $id
        student_id: $student_id
        student_status: $student_status
        consultant_status: $consultant_status
        session_status: $session_status
        absent_present_description: $absent_present_description
        compensatory_meet: $compensatory_meet
        single_meet: $single_meet
        remote: $remote
        compensatory_of_definition_detail_id: $compensatory_of_definition_detail_id
        compensatory_for_definition_detail_id: $compensatory_for_definition_detail_id
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
      session_status
      consultant_status
      student_status

      compensatory_meet
      single_meet
      remote
      compensatory_of_definition_detail_id
      compensatory_for_definition_detail_id

      student_status_updated_at
      user_id_student_status
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

export const DELETE_CONSULTANTN_DEFINITION_STUDENT_ID = gql`
  mutation DELETE_CONSULTANTN_DEFINITION_STUDENT_ID($id: ID!) {
    deleteConsultantDefinitionDetailStudentId(input: { id: $id }) {
      id
      user_id
      start_hour
      end_hour
    }
  }
`;

export const CPOY_TIME_TABLE_OF_CONSULTANT = gql`
  mutation COPY_CONSULATNT_TIME_TABLE($consultant_id: Int!) {
    createConsultantDefinitionDetailCopyCurrentWeekPlan(
      input: { consultant_id: $consultant_id }
    ) {
      id
      session_date
      start_hour
      end_hour
      step
      branch_class_room_id
    }
  }
`;

export const COPY_STUDENT_TO_NEXT_WEEK = gql`
  mutation COPY_STUDENT_TO_NEXT_TIME_TABLE($id: ID!) {
    copyOneStudentToNextTimeTable(id: $id) {
      id
      student_id
      student_status
    }
  }
`;

export const DELETE_ONE_SESSION_OF_TIME_TABLE = gql`
  mutation DELETE_DEFINITION_DETAIL($id: ID!) {
    deleteConsultantDefinitionDetail(id: $id) {
      id
      student_id
      student_status
    }
  }
`;

export const COPY_ONE_DAY_CONSULTANT_TIME_TABLE = gql`
  mutation COPY_ONE_DAY_CONSULTANT_TIME_TABLE(
    $consultant_id: Int!
    $session_date: String!
  ) {
    copyOneDayOfOneConsultantTimeTable(
      input: { consultant_id: $consultant_id, session_date: $session_date }
    ) {
      id

      session_date
      start_hour
      end_hour
    }
  }
`;
export const Divide_Consultant_Definition_Detail_Time = gql`
  mutation DivideConsultantDefinitionDetailTime(
    $definition_id: Int!
    $division_time: Int!
  ) {
    DivideConsultantDefinitionDetailTime(
      input: { definition_id: $definition_id, division_time: $division_time }
    ) {
      id
      session_date
      start_hour
      end_hour
    }
  }
`;

export const REMOVE_COMPENTASORY_MEET = gql`
  mutation REMOVE_COMPENSATORY($definition_detail_id: ID!) {
    removeCompensatoryMeet(definition_detail_id: $definition_detail_id) {
      id
      compensatory_meet
      compensatory_of_definition_detail_id
    }
  }
`;
