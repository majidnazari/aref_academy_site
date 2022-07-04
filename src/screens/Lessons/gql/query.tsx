import { gql } from '@apollo/client';

export const GET_LESSONS = gql`
    query GET_LESSONS(
        $first: Int!
        $page: Int!
    ){
      getLessons(first:$first,page:$page){
        data{
          id
          name
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

export const GET_A_LESSON = gql`
    query GET_A_LESSON(
        $id: ID!
    ){
      getLesson(id:$id){
        id
        name
      }
    }  
`;