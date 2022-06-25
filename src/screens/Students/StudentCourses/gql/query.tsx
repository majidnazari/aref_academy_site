import { gql } from '@apollo/client';

export const GET_A_STUDENT = gql`
    query GET_A_STUDENT(
        $id: ID!
    ){
      getStudent(id:$id){
        first_name
        last_name
        phone
      }
    }  
`;

export const GET_A_STUDENT_COURSES = gql`
    query GET_A_STUDENT_COURSES(
      $first: Int!
      $page: Int
      $student_id:Int
    ) {
      getCourseStudents(
        first: $first
        page: $page
        student_id:$student_id
        ){
        data{
          course{
            name
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
          teacher{
            first_name
            last_name
          }
          education_level
        }
      }
    }  
`;