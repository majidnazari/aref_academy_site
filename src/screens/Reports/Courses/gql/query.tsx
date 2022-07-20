import { gql } from '@apollo/client';
export const GET_COURSES = gql`
    query GET_COURSES(
        $first: Int!
        $page: Int!
    )
    {
      getCourses(first:$first,page:$page)
      {
        data
        {
          id
          name
          lesson{
            id
            name
          }
          type
          teacher{
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
        $course_id:Int
        $orderBy: [OrderByClause!]
      ) {
        getCourseStudents(
          first: $first
          page: $page
          course_id:$course_id
          orderBy:$orderBy
          ){

          data{
            student{
                id
                first_name
                last_name
                phone
              }
              student_status
              user_creator{
                first_name
                last_name
              }
              manager_status
              user_manager{
                first_name
                last_name
              }
              financial_status
              user_financial{
                first_name
                last_name
              }
              created_at
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