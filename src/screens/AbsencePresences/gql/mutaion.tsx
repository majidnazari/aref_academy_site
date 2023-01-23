import { gql } from "@apollo/client";

export const CREATE_ABSENCE_PERESENCE_LIST = gql`
  mutation CREATE_ABSENCE_PERESENCE_LIST(
    $course_id: Int!
    $course_session_id: Int!
  ) {
    createAllStudentToListBeforeAbsencePresence(
      input: { course_id: $course_id, course_session_id: $course_session_id }
    )
  }
`;

export const UPDATE_ABSENCE_PERESENCE = gql`
  mutation UPDATE_ABSENCE_PERESENCE(
    $course_session_id: Int
    $id: ID!
    $status: String
    $teacher_id: Int
    $attendance_status: String
  ) {
    updateAbsencePresence(
      input: {
        course_session_id: $course_session_id
        id: $id
        status: $status
        teacher_id: $teacher_id
        attendance_status: $attendance_status
      }
    ) {
      id
    }
  }
`;

export const UPDATE_STUDENT_WARNING_HISTORY = gql`
  mutation UPDATE_STUDENT_WARNING_HISTORY(
    $course_id: Int
    $response: String!
    $student_id: Int!
  ) {
    updateStudentWarningHistory(
      input: {
        course_id: $course_id
        response: $response
        student_id: $student_id
      }
    ) {
      id
    }
  }
`;

export const CREATE_STUDENT_COURSE = gql`
  mutation CREATE_STUDENT_COURSE($course_id: Int!, $student_id: Int!) {
    createCourseStudent(
      input: { course_id: $course_id, student_id: $student_id }
    ) {
      id
    }
  }
`;

export const CREATE_STUDENT = gql`
  mutation CREATE_STUDENT(
    $first_name: String!
    $last_name: String!
    $phone: String!
    $nationality_code:String!
  ) {
    createStudent(
      input: {
        first_name: $first_name
        last_name: $last_name
        phone: $phone
        nationality_code:$nationality_code
      }
    ) {
      id
    }
  }
`;
