import { gql } from "@apollo/client";
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

export const GET_COURSES_STUDENTS = gql`
  query GET_COURSES_STUDENTS(
    $first: Int!
    $page: Int
    $course_id: Int
    $orderBy: [OrderByClause!]
  ) {
    getCourseStudents(
      first: $first
      page: $page
      course_id: $course_id
      orderBy: $orderBy
    ) {
      data {
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
        description
        transferred_course {
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

export const GET_COURSES_TOTAL_REPORT = gql`
  query GET_COURSES_TOTAL_REPORT($course_id: Int) {
    getCourseTotalReport(course_id: $course_id) {
      avg_absent
      avg_dellay
      end_session
      id
      start_session
      teacher_name
      total_approved
      total_done_session
      total_fired
      total_noMoney
      total_noMoney_semi_pending
      total_pending
      total_refused
      total_session
      total_students
    }
  }
`;
