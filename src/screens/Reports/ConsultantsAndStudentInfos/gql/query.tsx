import { gql } from '@apollo/client'

export const GET_CONSULTANT_FINANCIAL_AND_STUDENT_INFOS = gql`
  query GET_CONSULTANT_FINANCIALS_AND_STUDENT_INFOS(
    $first: Int!
    $page: Int!
    $consultant_id: Int
    $student_id: Int
    $branch_id: Int
    $manager_status: ManagerStatus
    $financial_status: FinancialStatus
    $student_status: StudentStatusConsultantFinancial
    $financial_refused_status: FinancialRefusedStatus
    $user_id_manager: Int
    $user_id_financial: Int
    $user_id_student_status: Int
    $description: String
    $major: StudentMajor
    $education_level: String
    $nationality_code: String
    $phone: String
    $school_name: String
    $orderBy: [OrderByClause!]
  ) {
    getConsultantFinancialsAndStudentInfosReport(
      first: $first
      page: $page
      consultant_id: $consultant_id
      student_id: $student_id
      branch_id: $branch_id
      manager_status: $manager_status
      financial_status: $financial_status
      student_status: $student_status
      financial_refused_status: $financial_refused_status
      user_id_manager: $user_id_manager
      user_id_financial: $user_id_financial
      user_id_student_status: $user_id_student_status
      description: $description
      major: $major
      education_level: $education_level
      nationality_code: $nationality_code
      phone: $phone
      school_name: $school_name

      orderBy: $orderBy
    ) {
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
        __typename
      }
      data {
        id
        year_id
        year {
          active
          name
          __typename
        }
        branch_id
        branch {
          id
          name
          __typename
        }
        student_id
        studentInfos {
          id
          student_id
          school_name
          first_name
          last_name
          nationality_code
          phone
          major
          education_level
          concours_year
        }
        consultant_id
        consultant {
          id
          email
          first_name
          last_name
          __typename
        }
        user_id_creator
        user {
          id
          first_name
          last_name
          __typename
        }
        user_id_manager
        manager {
          id
          first_name
          last_name
          __typename
        }
        user_id_financial
        financial {
          id
          first_name
          last_name
          __typename
        }
        user_id_student_status
        consultant_definition_detail_id
        # definitionDetail{
        #   id
        #   consultant_id
        #   student_id
        #   remote
        #   session_date
        #   single_meet
        #   compensatory_meet
        # }
        description
        financial_status
        manager_status
        student_status
        financial_refused_status
        financial_status_updated_at
        user_id_student_status
        description
        created_at
        __typename
      }
      __typename
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

// export const GET_STUDENTS = gql`
//   query GET_STUDENTS(
//     $first: Int!
//     $page: Int!
//     $first_name: String
//     $last_name: String
//     $orderBy: [OrderByClause!]
//     $phone: String
//     $nationality_code: String
//     $cities_id: Int
//   ) {
//     getStudents(
//       first: $first
//       page: $page
//       first_name: $first_name
//       last_name: $last_name
//       orderBy: $orderBy
//       phone: $phone
//       nationality_code: $nationality_code
//       cities_id: $cities_id
//     ) {
//       data {
//         id
//         first_name
//         last_name
//         phone
//         mother_phone
//         father_phone
//         home_phone
//         major
//         egucation_level
//         parents_job_title
//         nationality_code
//       }
//       paginatorInfo {
//         count
//         currentPage
//         firstItem
//         hasMorePages
//         lastItem
//         lastPage
//         perPage
//         total
//       }
//     }
//   }
// `
export const GET_STUDENTS = gql`
  query GET_STUDENTS($first: Int!, $page: Int!, $full_name: String, $orderBy: [OrderByClause!]) {
    getStudents(first: $first, page: $page, full_name: $full_name, orderBy: $orderBy) {
      data {
        id
        first_name
        last_name
        phone
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
    }
  }
`
