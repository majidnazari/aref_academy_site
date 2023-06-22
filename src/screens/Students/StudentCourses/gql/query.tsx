import { gql } from '@apollo/client';

export const GET_A_STUDENT = gql`
    query GET_A_STUDENT(
        $id: ID!
    ){
      getStudent(id:$id){
        first_name
        last_name
        phone
        nationality_code
      }
    }  
`;

export const GET_A_STUDENT_COURSES = gql`
    query GET_A_STUDENT_COURSES(
      $first: Int!
      $page: Int
      $student_id:Int
      $orderBy: [OrderByClause!]
    ) {
      getCourseStudents(
        first: $first
        page: $page
        student_id:$student_id
        orderBy:$orderBy
        ){
        data{
          id
          financial_status
          manager_status
          student_status
          created_at
          description
          user_manager{
            first_name
            last_name
          }
          user_creator{
            first_name
            last_name
          }
          user_financial{
            first_name
            last_name
          }
          user_student_status{
            first_name
            last_name
          }
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
          transferred_course{
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
          financial_refused_status
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

export const GET_COURSES = gql`
    query GET_COURSES(
        $first: Int!
        $page: Int!
    ){
      getCourses(first:$first,page:$page){
        data{
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

export const GET_COURSES_AT_SPECIALTIME=gql` 
      query getCourseTotalReportAtSpecialTime(
          $first: Int!
          $page: Int
          $course_date_from:String
          $course_date_to:String
          $orderBy: [OrderByClause!]

      )
      {
        getCourseTotalReportAtSpecialTime(
          first:$first 
          page:$page  
          course_date_from: $course_date_from 
          course_date_to: $course_date_to
          orderBy:$orderBy
        ){
          data{
            id
            name
            gender
            branch{
              name
            }
            teacher{
              last_name
              first_name
            }     
            lesson{
              name
            }
            education_level
            type
            financial_status
            courseSession {
              id
              start_date
            }
            courseStudent{
              id
            }
          }
          
        }
      }
      `;

export const GET_COURSE_SESSION_BY_DATE=gql`
      query getCourseSessionByDate(
  $session_date_from:String,
  $session_date_to:String,
  
){
  getCourseSessionOrderbyDate(
    session_date_from:$session_date_from
    session_date_to:$session_date_to
  )
  {
    date
    details{
      id
      name
      start_date
      start_time
      end_time
      course_id
      course_name
      lesson_name
      teacher_name
      
    }
  }
}`