import { gql } from '@apollo/client';

export const GET_BRANCHES = gql`
    query GET_BRANCHES(
      $first: Int!
      $page: Int
      $name: String
      $orderBy: [OrderByClause!]
    ){
      getBranches(
        first:$first,
        page:$page,
        name:$name,
        orderBy:$orderBy
        )
        {
          data{
            id
            user{
              first_name
              last_name
            }
            name
            created_at
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

export const GET_A_BRANCHE = gql`
    query GET_A_BRANCHE(
        $id: ID!
    ){
      getBranch(id:$id){
        id
        name
      }
    }  
`;