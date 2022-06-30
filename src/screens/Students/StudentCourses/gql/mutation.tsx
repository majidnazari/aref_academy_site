import { gql } from '@apollo/client';

export const CREATE_STUDENT_COURSE = gql`
    mutation CREATE_STUDENT_COURSE(
        $course_id: Int!
        $financial_status: String
        $manager_status: String
        $student_id: Int!
        $student_status: String
        $user_id_financial: Int
        $user_id_manager: Int
        $user_id_student_status: Int
        )
        {
            createCourseStudent(input:{
                course_id:$course_id
                financial_status: $financial_status
                manager_status: $manager_status
                student_id: $student_id
                student_status: $student_status
                user_id_financial: $user_id_financial
                user_id_manager: $user_id_manager
                user_id_student_status: $user_id_student_status
            }){
                id
            }
        }
    
`;

export const DELETE_STUDENT_COURSE = gql`
    mutation DELETE_STUDENT_COURSE($id: ID!) {
        deleteCourseStudent(id:$id){
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
