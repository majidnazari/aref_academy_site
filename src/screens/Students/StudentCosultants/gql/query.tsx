import { gql } from "@apollo/client";

export const GET_A_STUDENT = gql`
  query GET_A_STUDENT($id: ID!) {
    getStudent(id: $id) {
      first_name
      last_name
      phone
      nationality_code
    }
  }
`;

export const GET_A_STUDENT_CONSULTANTS = gql`
  query GET_A_STUDENT_CONSULTANTS(
    $first: Int!
    $page: Int
    $student_id: Int
    $orderBy: [OrderByClause!]
  ) {
    getConsultantFinancials(
      first: $first
      page: $page
      student_id: $student_id
      orderBy: $orderBy
    ) {
      data {
        manager_status
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

export const GET_YEARS = gql`
  query GET_YEARS(
    $first: Int!
    $page: Int!
    $active: Boolean
    $orderBy: [OrderByClause!]
  ) {
    getYears(first: $first, page: $page, active: $active, orderBy: $orderBy) {
      data {
        id
        user_id_creator
        name
        active
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

export const GET_CONSULTANTS = gql`
  query GET_USERS(
    $first: Int!
    $page: Int!
    $first_name: String
    $last_name: String
    $email: String
  ) {
    getUsers(
      first: $first
      page: $page
      group_id: 6
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

export const GET_COURSES_AT_SPECIALTIME = gql`
  query getCourseTotalReportAtSpecialTime(
    $first: Int!
    $page: Int
    $course_date_from: String
    $course_date_to: String
    $orderBy: [OrderByClause!]
  ) {
    getCourseTotalReportAtSpecialTime(
      first: $first
      page: $page
      course_date_from: $course_date_from
      course_date_to: $course_date_to
      orderBy: $orderBy
    ) {
      data {
        id
        name
        gender
        branch {
          name
        }
        teacher {
          last_name
          first_name
        }
        lesson {
          name
        }
        education_level
        type
        financial_status
        courseSession {
          id
          start_date
        }
        courseStudent {
          id
        }
      }
    }
  }
`;

export const GET_COURSE_SESSION_BY_DATE = gql`
  query getCourseSessionByDate(
    $session_date_from: String
    $session_date_to: String
    $next_week: Boolean
  ) {
    getCourseSessionOrderbyDate(
      session_date_from: $session_date_from
      session_date_to: $session_date_to
      next_week: $next_week
    ) {
      date
      details {
        id
        start_date
        start_time
        end_time
        course_id
        course_name
        lesson_name
        teacher_name
        class_rome_name
        gender
        education_level
        course_type
        branch_name
      }
    }
  }
`;

export const GET_COURSE_SESSION_BY_DATE_WITH_TODAY = gql`
  query getCourseSessionByDateWithToday(
    $session_date_from: String
    $session_date_to: String
    $next_week: Boolean
  ) {
    getCourseSessionOrderbyDate(
      session_date_from: $session_date_from
      session_date_to: $session_date_to
      next_week: $next_week
    ) {
      today
      data {
        date
        details {
          id
          start_date
          start_time
          end_time
          course_id
          course_name
          lesson_name
          teacher_name
          class_rome_name
          gender
          education_level
          course_type
          branch_name
        }
      }
    }
  }
`;
