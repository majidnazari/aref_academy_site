import { gql } from '@apollo/client';

export const GET_FAULTS = gql`
    query GET_FAULTS(
        $first: Int!
        $page: Int!
        $description: String
        $orderBy: [OrderByClause!]
    ){
      getFaults(
          first:$first,
          page:$page,
          description:$description,
          orderBy:$orderBy)
        {
          data{
            id
            user{
              first_name
              last_name
            }
            description
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

export const GET_A_FAULT = gql`
    query GET_A_FAULT(
        $id: ID!
    ){
      getFault(id:$id){
        id
        user{
          first_name
          last_name
        }
        description
      }
    }  
`;