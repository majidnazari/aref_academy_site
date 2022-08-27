import { gql } from '@apollo/client';
export const GET_COURSES_STUDENTS = gql`
    query GET_COURSES_STUDENTS(
        $first: Int!
        $page: Int
        $course_id:Int
        $financial_status: String
        $manager_status_not_equal: String
        $financial_status_not_equal: String
        $manager_financial_not_equal: String
        $orderBy: [OrderByClause!]
      ) {
        getCourseStudents(
          first: $first
          page: $page
          course_id:$course_id
          financial_status:$financial_status
          manager_status_not_equal:$manager_status_not_equal
          financial_status_not_equal:$financial_status_not_equal
          manager_financial_not_equal:$manager_financial_not_equal
          orderBy:$orderBy
          ){

          data{
            id
            student{
                id
                first_name
                last_name
                phone
              }
              student_status
              user_student_status{
                first_name
                last_name
              }
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
              course{
                name
                lesson{
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