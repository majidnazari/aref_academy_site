import { gql } from '@apollo/client';

export const GET_YEARS = gql`
    query GET_YEARS(
        $first: Int!
        $page: Int!
    ){
      getYears(first:$first,page:$page){
        data{
          id
          user_id_creator
          name
          active
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

export const GET_A_YEAR = gql`
    query GET_A_YEAR(
        $id: ID!
    ){
      getYear(id:$id){
        id
        user_id_creator
        name
        active
      }
    }  
`;