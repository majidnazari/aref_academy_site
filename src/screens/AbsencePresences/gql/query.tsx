import { gql } from "@apollo/client";

export const GET_COURSE_SESSIONS = gql`
    query GET_COURSE_SESSIONS(
      $name: String
      $course_id: Int
      $date_after: Date
      $date_befor: Date
      $start_time_after: String
      $start_time_befor: Date
      $end_time_after: String
      $end_time_befor: String
      $orderBy: [OrderByClause!]
      $first: Int!
      $page: Int
    ){
      getCourseSessions(
        name: $name
        course_id: $course_id
        date_after: $date_after
        date_befor: $date_befor
        start_time_after: $start_time_after
        start_time_befor: $start_time_befor
        end_time_after: $end_time_after
        end_time_befor: $end_time_befor
        orderBy: $orderBy
        first: $first
        page: $page
      ){
        data{
          id
          name
          start_date
          start_time
          end_time
          special
          course{
            id
            name
            teacher{
              first_name
              last_name
            }
            lesson{
              id
              name
            }
          }
        }
        paginatorInfo{
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

export const GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE = gql`
    query GET_COURSE_STUDENT_WITH_ABSENT_PRESENCE(
      $course_id: Int!
      $course_session_id: Int!
      $first: Int!
      $page: Int
    ){
      getCourseStudentsWithAbsencePresence(
        course_id: $course_id
        course_session_id: $course_session_id
        first: $first
        page: $page
      ){
        data{
          id
          ap_attendance_status
          ap_course_session_id
          ap_created_at
          ap_id
          ap_status
          ap_student_id
          ap_teacher_id
          ap_user_id_creator
          course_id
          cs_course_id
          cs_created_at
          cs_financial_status
          cs_manager_status
          cs_student_status
          cs_user_id_creator
          cs_user_id_financial
          cs_user_id_manager
          cs_user_id_student_status
          student{
            first_name
            last_name
            id
          }
        }
        paginatorInfo{
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

export const GET_A_COURSE = gql`
    query GET_A_COURSE(
        $id: ID!
    ){
      getCourse(id:$id) {
          id
          user_id_creator
          year_id
          teacher_id
          name
          lesson {
            id
            name
          }
          type
          education_level
          teacher{
            first_name
            last_name
          }
          branch{
            id
            name
          }
        }
    }  
`;