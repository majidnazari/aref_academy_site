import { gql } from '@apollo/client';

export const CREATE_ABSENCE_PERESENCE_LIST = gql`
    mutation CREATE_ABSENCE_PERESENCE_LIST(
            $course_id: Int!
            $course_session_id: Int!
        )
        {
            createAllStudentToListBeforeAbsencePresence(input:{
                course_id: $course_id
                course_session_id: $course_session_id
            })
        }
`;

export const UPDATE_ABSENCE_PERESENCE = gql`
    mutation UPDATE_ABSENCE_PERESENCE(
            $course_session_id: Int
            $id: ID!
            $status: String
            $teacher_id: Int
            $attendance_status: String
        )
    {
        updateAbsencePresence(input:{
            course_session_id: $course_session_id
            id: $id
            status: $status
            teacher_id: $teacher_id
            attendance_status: $attendance_status
        }){
            id
        }
    }
`;