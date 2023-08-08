import { gql } from "@apollo/client";

export const CREATE_STUDENT_CONSULTANT = gql`
  mutation CREATE_STUDENT_CONSULTANT(
    $branch_id: Int
    $consultant_definition_detail_id: Int
    $consultant_id: Int!
    $description: String
    $financial_refused_status: FinancialRefusedStatus
    $financial_status: FinancialStatus
    $manager_status: ManagerStatus
    $student_id: Int!
    $student_status: StudentStatusConsultantFinancial
    $year_id: Int
  ) {
    createConsultantFinancial(
      input: {
        branch_id: $branch_id
        consultant_definition_detail_id: $consultant_definition_detail_id
        consultant_id: $consultant_id
        description: $description
        financial_refused_status: $financial_refused_status
        financial_status: $financial_status
        manager_status: $manager_status
        student_id: $student_id
        student_status: $student_status
        year_id: $year_id
      }
    ) {
      id
    }
  }
`;

export const DELETE_STUDENT_COURSE = gql`
  mutation DELETE_STUDENT_COURSE($id: ID!) {
    deleteCourseStudent(id: $id) {
      id
    }
  }
`;

export const UPDATE_STUDENT_COURSE = gql`
  mutation UPDATE_STUDENT_COURSE(
    $id: ID!
    $financial_status: String
    $manager_status: String
    $student_status: String
    $transferred_to_course_id: Int
    $description: String
    $financial_refused_status: String
  ) {
    updateCourseStudent(
      input: {
        id: $id
        financial_status: $financial_status
        manager_status: $manager_status
        student_status: $student_status
        transferred_to_course_id: $transferred_to_course_id
        description: $description
        financial_refused_status: $financial_refused_status
      }
    ) {
      id
    }
  }
`;
