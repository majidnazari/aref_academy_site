import { gql } from '@apollo/client';

export const CREATE_STUDENT_COURSE = gql`
    mutation CREATE_STUDENT_COURSE(
        $course_id: Int
        $status: String
        $student_id: Int
        )
        {
            createCourseStudent(input:{
                course_id:$course_id
                status:$status
                student_id:$student_id
            }){
                id
            }
        }
    
`;
