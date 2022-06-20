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

export const GET_A_STUDENT_COURSE = gql `
    query GET_A_STUDENT_COURSE(
      $student_id:Int
    ) {
      getCourseStudent(student_id:$student_id){
        course_id
        created_at
      }
    }
`;