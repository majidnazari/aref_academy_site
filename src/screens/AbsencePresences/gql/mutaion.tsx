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