import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query GET_USERS(
        $first: Int!
        $page: Int!
    ){
    getUsers(first:$first,page:$page){
        data{
          userId
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

export const CREATE_USER = gql`
    mutation Create_user (
        $email:String!,
        $password:String!,
        $first_name:String!,
        $last_name:String!
        $group_id:Int!
      ) 
      {
        createUser( 
          email:$email,
          password:$password,
          first_name:$first_name,
          last_name:$last_name,
          group_id:group_id
          )
          {
            id
        }
    }
`;
