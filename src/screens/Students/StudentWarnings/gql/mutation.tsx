import { gql } from '@apollo/client';

export const CREATE_STUDENT_WARNING = gql`
    mutation CREATE_STUDENT_WARNING(
        $comment: String!
        $student_id: Int!
        $course_id: Int
        )
        {
            createStudentWarning(input:{
                comment:$comment
                student_id: $student_id
                course_id:$course_id
            }){
                id
            }
        }
    
`;
