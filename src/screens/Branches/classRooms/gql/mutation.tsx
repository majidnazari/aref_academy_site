import { gql } from '@apollo/client';

export const DELETE_CLASSROOM = gql`
    mutation DELETE_CLASSROOM ($id:ID!) {  
        deleteBranchClassRoom(id:$id){
            id
        }
    }  
`;

export const CREATE_CLASSROOM = gql`
    mutation CREATE_CLASSROOM(
        $name: String
        $branch_id: Int
        $description: String
        )
        {
            createBranchClassRoom(input:{
                name:$name,
                branch_id:$branch_id,
                description:$description
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
