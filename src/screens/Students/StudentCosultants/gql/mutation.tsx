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

export const DELETE_CONSULTANT_FINANCIAL = gql`
  mutation DELETE_CONSULTANT_FINANCIAL($id: ID!) {
    deleteConsultantFinancial(id: $id) {
      id
    }
  }
`;

export const CREATE_STUDENT_INFO = gql`
  mutation CREATE_STUDENT_INFO(
    $student_id: Int!
    $school_name: String
    $first_name: String
    $last_name: String
    $nationality_code: String
    $phone: String
    $major: StudentMajor
    $education_level: String
    $concours_year: String
  ) {
    createStudentInfo(
      input: {
        student_id: $student_id
        school_name: $school_name
        first_name: $first_name
        last_name: $last_name
        nationality_code: $nationality_code
        phone: $phone
        major: $major
        education_level: $education_level
        concours_year: $concours_year
      }
    ) {
      id
      student_id
      first_name
      last_name
      major
      education_level
      school_name
      user_id_creator
      UserCreator {
        first_name
        last_name
      }
      phone
      concours_year
    }
  }
`;
