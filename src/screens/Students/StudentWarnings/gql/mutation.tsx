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

export const UPDATE_STUDENT_COURSE = gql`
    mutation UPDATE_STUDENT_COURSE(
        $id:ID!,
        $financial_status:String,
        $manager_status:String,
        $student_status:String,
        )
        {
        updateCourseStudent(input:{
            id:$id,
            financial_status:$financial_status,
            manager_status:$manager_status,
            student_status:$student_status,
        }){
            id
        }
    }
`;
