import { gql } from '@apollo/client';

export const DELETE_BRANCHE = gql`
    mutation DELETE_BRANCHE ($id:ID!) {  
        deleteBranch(id:$id){
            id
        }
    }  
`;

export const CREATE_BRANCHE = gql`
    mutation CREATE_BRANCHE(
        $name: String!
        )
        {
            createBranch(input:{
                name:$name,
            }){
                id
            }
        }
    
`;

export const EDIT_BRANCHE = gql`
    mutation CREATE_BRANCHE(
        $id:Int!,
        $name:String,
        )
        {
        updateBranch(input:{
            id:$id,
            name:$name,
        }){
            id
        }
    }
`;
