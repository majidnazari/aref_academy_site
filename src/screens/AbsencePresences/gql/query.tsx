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