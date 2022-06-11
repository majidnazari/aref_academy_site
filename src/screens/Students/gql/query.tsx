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

export const GET_A_STUDENT = gql`
    query GET_A_STUDENT(
        $id: ID!
    ){
      GetStudent(id:$id){
        egucation_level
        father_phone
        first_name
        home_phone
        id
        last_name
        major
        mother_phone
        parents_job_title
        phone
        description
      }
    }  
`;