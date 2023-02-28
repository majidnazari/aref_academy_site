import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query GET_USERS(
        $first: Int!
        $page: Int!
        $first_name:String
        $last_name:String
        $email:String
        $group_id:Int
        $branch_id:Int
    ){
    getUsers(first:$first,page:$page,first_name:$first_name,last_name:$last_name,email:$email,group_id:$group_id,branch_id:$branch_id){
        data{
          id
          first_name
          last_name
          email
          group{
            persian_name
          }
          branch{
            name
          }
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

export const GET_GROUPS = gql`
  query GET_GROUPS(
    $first: Int!
    $page: Int!
  ) {
    getGroups(first:$first,page:$page){
      data{
        id
        persian_name
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

export const GET_A_USER = gql`
    query GET_A_USERS(
        $id: ID!
    ){
      getUser(id:$id){
        id
        first_name
        last_name
        email
        group{
          id
        }
        branch_id
      }
    }  
`;

export const GET_BRANCHES = gql`
  query GET_BRANCHES(
    $first: Int!
    $page: Int!
    $orderBy: [OrderByClause!]
  ){
    getBranches(first:$first,page:$page,orderBy:$orderBy){
      data{
        id
        name
      }
    }
  }
`;