import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query GET_USERS(
        $first: Int!
        $page: Int!
    ){
    getUsers(first:$first,page:$page){
        data{
          id
          first_name
          last_name
          email
        }
        paginatorInfo{
          count
          currentPage
          firstItem
          hasMorePages
          lastItem
          lastPage
          perPage
          total
        }
      }
    }  
`;

export const DELETE_USER = gql`
    mutation Delete_user ($id:ID!) {  
        deleteUser(id:$id){
            id
        }
    }  
`;
