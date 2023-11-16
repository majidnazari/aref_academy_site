import { gql } from '@apollo/client';

export const GET_BRANCHE_CLASS_ROOMS = gql`
    query GET_BRANCHE_CLASS_ROOMS(
      $first: Int!
      $page: Int
      $name: String
      $description: String
      $branch_id: Int
      $orderBy: [OrderByClause!]
    ){
      getBranchClassRooms(
        first:$first,
        page:$page,
        name:$name,
        description:$description,
        branch_id:$branch_id,
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
            description
            created_at
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

export const GET_A_BRANCHE_CLASS_ROOM = gql`
    query GET_A_BRANCHE_CLASS_ROOM(
        $id: ID!
    ){
      getBranchClassRoom(id:$id){
        id
        name
        description
        branch {
          id
          name
        }
      }
    }  
`;