import { gql } from "@apollo/client";

export const GET_A_COSULTANT = gql`
  query GET_A_CONSULTANT($id: ID!) {
    consultant(_id: $id) {
      _id
      timeTable {
        dayOfWeek
        startEnd {
          start
          end
        }
      }
      userId
      step
    }
  }
`;

export const GET_CONSULTANTS = gql`
  query GET_CONSULTANTS(
    $first: Int!
    $page: Int!
    $first_name: String
    $last_name: String
    $email: String
  ) {
    getConsultants(
      first: $first
      page: $page     
      first_name: $first_name
      last_name: $last_name
      email: $email
    ) {
      data {
        id
        first_name
        last_name
        email
        group {
          persian_name
        }
        branch {
          name
        }
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
`;

export const GET_LESSONS = gql`
  query GET_LESSONS(
    $first: Int!
    $page: Int
    $orderBy: [OrderByClause!]
    $name: String
  ) {
    getLessons(first: $first, page: $page, orderBy: $orderBy, name: $name) {
      data {
        id
        name
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
`;

export const GET_BRANCH_CLASSROOMS = gql`
  query GET_BRANCH_CLASSROOMS(
    $first: Int!
    $page: Int
    $orderBy: [OrderByClause!]
  ) {
    getBranchClassRooms(first: $first, page: $page, orderBy: $orderBy) {
      data {
        id
        name
        branch {
          name
        }
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
`;

export const GET_CONSULTANT_DEFINITION_DETAILS = gql`
  query GET_CONSULTANT_DEFINITION_DETAILS(
    $absent_present_description: String
    $branch_class_room_id: Int
    $consultant_id: Int
    $consultant_test_id: Int
    $end_hour_from: String
    $end_hour_to: String
    $session_date_from: Date
    $session_date_to: Date
    $start_hour_from: String
    $start_hour_to: String
    $step: Int
    $student_id: Int
    $student_status: [StudentStatus]
    $test_description: String
    $user_id: Int
    $next_week: Boolean
  ) {
    getConsultantDefinitionDetails(
      absent_present_description: $absent_present_description
      branch_class_room_id: $branch_class_room_id
      consultant_id: $consultant_id
      consultant_test_id: $consultant_test_id
      end_hour_from: $end_hour_from
      end_hour_to: $end_hour_to

      session_date_from: $session_date_from
      session_date_to: $session_date_to
      start_hour_from: $start_hour_from
      start_hour_to: $start_hour_to
      step: $step
      student_id: $student_id
      student_status: $student_status
      test_description: $test_description
      user_id: $user_id
      next_week: $next_week
    ) {
      date
      details {
        consultant_id
        id
        consultant_id
        consultant_first_name
        consultant_last_name
        student_id
        student {
          first_name
          last_name
          is_academy_student
          egucation_level
          concours_year
          father_phone
          home_phone
          major
          mother_phone
          nationality_code
          student_phone
          phone
        }
        branch_class_room_id
        start_hour
        end_hour
        session_date
        branchClassRoom_name
        student_status
      }
    }
  }
`;

export const GET_CONSULTANT_DEFINITION_DETAIL = gql`
  query GET_A_CONSULTANTDEFINITIONDETAIL($id: ID!) {
    getConsultantDefinitionDetail(id: $id) {
      id
      absent_present_description
      branchClassRoom {
        id
      }
      branch_class_room_id
      consultant {
        id
      }
      consultant_id
      consultant_test_id
      start_hour
      end_hour
      session_date
      step
      student {
        id
      }
      student_id
      student_status
      session_status
      consultant_status
      test_description
      user_id
    }
  }
`;

export const GET_STUDENTS = gql`
  query GET_STUDENTS(
    $first: Int!
    $page: Int!
    $first_name: String
    $last_name: String
    $orderBy: [OrderByClause!]
    $phone: String
    $nationality_code: String
    $ids: [Int]
  ) {
    getStudents(
      first: $first
      page: $page
      first_name: $first_name
      last_name: $last_name
      orderBy: $orderBy
      phone: $phone
      nationality_code: $nationality_code
      ids: $ids
    ) {
      data {
        id
        first_name
        last_name
        phone
        mother_phone
        father_phone
        home_phone
        major
        egucation_level
        parents_job_title
        nationality_code
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
`;

export const GET_A_STUDENT = gql`
  query GET_A_STUDENT($id: ID!) {
    getStudent(id: $id) {
      egucation_level
      father_phone
      first_name
      home_phone
      id
      last_name
      major
      mother_phone
      parents_job_title
      phone
      nationality_code
      concours_year
    }
  }
`;

export const GET_A_USER = gql`
  query GET_A_USERS($id: ID!) {
    getUser(id: $id) {
      id
      first_name
      last_name
      email
    }
  }
`;

export const GET_A_CONSULTANT_TIME_TABLE = gql`
  query GET_CONSULTANT_DEFINITION_DETAIL($id: ID!) {
    getConsultantDefinitionDetail(id: $id) {
      id
      consultant_id
      start_hour
      end_hour
      session_date
      student_id
    }
  }
`;

export const GET_CONSULTANT_SHOW_TIMES = gql`
  # Write your query or mutation here
  query GET_CONSULTANTS_TIME_SHOW($consultant_id: Int, $target_date: String) {
    getConsultantsTimeShow(
      consultant_id: $consultant_id
      target_date: $target_date
    ) {
      consultant {
        id
        first_name
        last_name
      }
      details {
        student_id
        id
        student_id
        student_status
        student {
          first_name
          last_name
          is_academy_student
          nationality_code
          phone
        }
        branchClassRoom_name
        user_id
        start_hour
        end_hour
      }
    }
  }
`;

// export const GET_CONSULTANT_FINANCIALS = gql`
//   query GET_CONSULTANT_FINANCIALS(
//     $first: Int!
//     $page: Int!
//     $consultant_id: Int
//   ) {
//     getConsultantFinancials(
//       first: $first
//       page: $page
//       consultant_id: $consultant_id
//     ) {
//       data {
//         id
//         student_id
//       }
//     }
//   }
// `;

export const GET_A_CONSULTANT_FINANCIAL = gql`
  query GET_A_CONSULTANT_FINANCIAL($id: ID!) {
    getConsultantFinancial(id: $id) {
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

export const GET_CONSULTANT_FINANCIALS = gql`
  query GET_CONSULTANT_FINANCIALS(
    $first: Int!
    $page: Int!
    $consultant_id: Int
    $student_id: Int
    $manager_status: ManagerStatus
    $financial_status: FinancialStatus
    $student_status: StudentStatusConsultantFinancial
    $financial_refused_status: FinancialRefusedStatus
    $user_id_manager: Int
    $user_id_financial: Int
    $user_id_student_status: Int
    $description: String
    $orderBy: [OrderByClause!]
  ) {
    getConsultantFinancials(
      first: $first
      page: $page
      consultant_id: $consultant_id
      student_id: $student_id
      manager_status: $manager_status
      financial_status: $financial_status
      student_status: $student_status
      financial_refused_status: $financial_refused_status
      user_id_manager: $user_id_manager
      user_id_financial: $user_id_financial
      user_id_student_status: $user_id_student_status
      description: $description
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
          phone
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
        created_at
      }
    }
  }
`;

export const GetConsultantStudentsByDefinitionId = gql`
  query GET_CONSULTANT_STUDENTS_BY_DEFINITION_ID($id: ID!) {
    GetConsultantStudentsByDefinitionId(id: $id)
  }
`;
