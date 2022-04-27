import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query GET_USERS(
        $first: String!
        $page: Int!
    )
    users(first:$first,page:$page){
        data{
        id
        first_name
        last_name
        type
        email     
        is_teacher
        }
    }
`;
