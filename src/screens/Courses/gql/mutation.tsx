import { gql } from '@apollo/client';

export const DELETE_COURSE = gql`
    mutation DELETE_COURSE ($id:ID!) {  
        deleteCourse(id:$id){
            id
        }
    }  
`;

export const CREATE_COURSE = gql`
    mutation CREATE_COURSE(
        $id: ID
        $user_id_creator: Int
        $year_id: Int
        $teacher_id: Int
        $name: String
        $lesson: String
        $type: String
        )
        {
            createCourse(input:{
                id: $id
                user_id_creator: $user_id_creator
                year_id: $year_id
                teacher_id: $teacher_id
                name: $name
                lesson: $lesson
                type: $type
            }){
                id
            }
        }
    
`;

export const EDIT_YEAR = gql`
    mutation EDIT_YEAR(
        $id:ID!,
        $name:String,
        $active:Boolean
        )
        {
        updateYear(input:{
            id:$id,
            name:$name,
            active:$active
        }){
            id
        }
    }
`;
