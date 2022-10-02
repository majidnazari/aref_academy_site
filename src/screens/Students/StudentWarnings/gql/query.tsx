import { gql } from "@apollo/client";

export const GET_A_STUDENT = gql`
  query GET_A_STUDENT($id: ID!) {
    getStudent(id: $id) {
      first_name
      last_name
      phone
    }
  }
`;

export const GET_A_STUDENT_WARNING_HISTORIES = gql`
  query GET_A_STUDENT_WARNING_HISTORIES(
    $comment: String
    $course_id: Int
    $first: Int!
    $orderBy: [OrderByClause!]
    $page: Int
    $response: String
    $student_id: Int
    $user_id_creator: Int
    $user_id_updater: Int
  ) {
    getStudentWarningHistories(
      comment: $comment
      course_id: $course_id
      first: $first
      page: $page
      response: $response
      student_id: $student_id
      user_id_creator: $user_id_creator
      user_id_updater: $user_id_updater
      orderBy: $orderBy
    ) {
      data {
        comment
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
        created_at
        id
        response
        user_updater {
          first_name
          last_name
        }
        updated_at
        user_creator {
          first_name
          last_name
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
