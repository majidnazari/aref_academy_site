import { gql } from '@apollo/client';

export const DELETE_LESSON = gql`
    mutation DELETE_LESSON ($id:ID!) {  
        deleteLesson(id:$id){
            id
        }
    }  
`;

export const CREATE_LESSON = gql`
    mutation CREATE_LESSON(
        $name:String!,
        )
        {
            createLesson(input:{
                name:$name,
            }){
                id
            }
        }
    
`;

export const EDIT_LESSON = gql`
    mutation EDIT_LESSON(
        $id:Int!,
        $name:String,
        )
        {
        updateLesson(input:{
            id:$id,
            name:$name,
        }){
            id
        }
    }
`;
