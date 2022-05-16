import { gql } from '@apollo/client';

export const DELETE_USER = gql`
    mutation Delete_user ($id:ID!) {  
        deleteUser(id:$id){
            id
        }
    }  
`;

export const CREATE_YEAR = gql`
    mutation CREATE_YEAR(
        $name:String!,
        $active:Boolean!,
        )
        {
            createYear(input:{
                name:$name,
                active:$active,
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
