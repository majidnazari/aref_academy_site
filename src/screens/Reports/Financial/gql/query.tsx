import { gql } from "@apollo/client";
export const GET_COURSES_STUDENTS = gql`
  query GET_COURSES_STUDENTS(
    $first: Int!
    $page: Int
    $student_id: Int
    $course_id: Int
    $financial_status: String
    $manager_status: String
    $student_status: String
    $total_present: Int
    $to_date: String
    $from_date: String
    $orderBy: [OrderByClause!]
  ) {
    getCourseStudents(
      first: $first
      page: $page
      student_id: $student_id
      course_id: $course_id
      financial_status: $financial_status
      manager_status: $manager_status
      student_status: $student_status
      total_present: $total_present
      from_date: $from_date
      to_date: $to_date
      orderBy: $orderBy
    ) {
      data {
        id
        student {
          id
          first_name
          last_name
          phone
        }
        student_status
        user_student_status {
          first_name
          last_name
        }
        user_creator {
          first_name
          last_name
        }
        manager_status
        user_manager {
          first_name
          last_name
        }
        financial_status
        user_financial {
          first_name
          last_name
        }
        created_at
        financial_status_updated_at
        course {
          name
          lesson {
            name
          }
          type
          teacher {
            first_name
            last_name
          }
          education_level
        }
        sum_total_present
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

export const GET_COURSES = gql`
  query GET_COURSES($first: Int!, $page: Int!) {
    getCourses(first: $first, page: $page) {
      data {
        id
        name
        lesson {
          id
          name
        }
        type
        teacher {
          first_name
          last_name
        }
        education_level
      }
    }
  }
`;

export const GET_STUDENTS = gql`
  query GET_STUDENTS(
    $first: Int!
    $page: Int!
    $full_name: String
    $orderBy: [OrderByClause!]
  ) {
    getStudents(
      first: $first
      page: $page
      full_name: $full_name
      orderBy: $orderBy
    ) {
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
`;
