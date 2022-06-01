import { gql } from '@apollo/client';

export const DELETE_FAULT = gql`
    mutation DELETE_FAULT ($id:ID!) {  
        deleteFault(id:$id){
            id
        }
    }  
`;

export const CREATE_FAULT = gql`
    mutation CREATE_FAULT(
        $description: String!
        )
        {
            createFault(input:{
                description:$description,
            }){
                id
            }
        }
    
`;

export const EDIT_FAULT = gql`
    mutation EDIT_FAULT(
        $id:Int!,
        $description:String,
        )
        {
        updateFault(input:{
            id:$id,
            description:$description,
        }){
            id
        }
    }
`;
