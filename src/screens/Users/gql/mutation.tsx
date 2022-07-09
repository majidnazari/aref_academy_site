import { gql } from '@apollo/client';

export const DELETE_USER = gql`
    mutation Delete_user ($id:ID!) {  
        deleteUser(id:$id){
            id
        }
    }  
`;

export const CREATE_USER = gql`
    mutation CreateUser(
        $email:String!,
        $password:String!,
        $first_name:String!,
        $last_name:String!,
        $group_id:Int!
        )
        {
            createUser(input:{
                email:$email,
                password:$password,
                first_name:$first_name,
                last_name:$last_name,
                group_id:$group_id
            }){
                id
            }
        }
    
`;

export const EDIT_USER = gql `
    mutation EDIT_USER(
        $id:ID!,
        $email:String,
        $first_name:String,
        $last_name:String,
        $group_id:Int
        )
        {
        updateUser(input:{
            id:$id,
            email:$email,
            first_name:$first_name,
            last_name:$last_name,
            group_id:$group_id
        }){
            id,
            first_name,
            last_name,
            email,
            created_at,
            updated_at,
            group{
            id,
            user_id_creator,
            name,
            type
            }
        }
    }
`;
