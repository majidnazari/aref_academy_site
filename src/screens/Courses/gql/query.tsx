import { gql } from '@apollo/client';

export const GET_COURSES = gql`
    query GET_COURSES(
        $first: Int!
        $page: Int!
    ){
      getCourses(first:$first,page:$page){
        data{
          id
          name
          lesson
          type
          created_at
          updated_at
          deleted_at
          user{
            first_name
            last_name
          }
          year{
            name
          }
          teacher{
            first_name
            last_name
          }
          education_level
          financial_status
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
          lesson
          type
          education_level
          teacher{
            first_name
            last_name
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
    ){
      getYears(first:$first,page:$page,active:$active,orderBy:$orderBy){
        data{
          id
          user_id_creator
          name
          active
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

export const GET_USERS = gql`
    query GET_USERS(
        $first: Int!
        $page: Int!
        $group_id:Int
    ){
    getUsers(first:$first,page:$page,group_id:$group_id){
        data{
          id
          first_name
          last_name
        }
      }
    }  
`;

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
          user_id_creator
          course_id
          name
          start_date
          start_time
          end_time
          special
          user{
            first_name
            last_name
          }
          course{
            name
            teacher{
              first_name
              last_name
            }
            lesson
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

export const GET_A_COURSE_SESSION = gql`
    query GET_A_COURSE_SESSION(
        $id: ID!
    ){
      getCourseSession(id:$id){
        id
        name
        price
        special
        start_date
        start_time
        end_time
      }
    }
`;