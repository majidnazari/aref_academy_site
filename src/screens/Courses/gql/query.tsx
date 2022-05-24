import { gql } from '@apollo/client';

export const GET_COURSES = gql`
    query GET_COURSES(
        $first: Int!
        $page: Int!
    ){
      getCourses(first:$first,page:$page){
        data{
          id
          name
          lesson
          type
          created_at
          updated_at
          deleted_at
          user{
            first_name
            last_name
          }
          year{
            name
          }
          teacher{
            first_name
            last_name
          }
          education_level
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

export const GET_A_COURSE = gql`
    query GET_A_COURSE(
        $id: ID!
    ){
      getCourse(id:$id) {
          id
          user_id_creator
          year_id
          teacher_id
          name
          lesson
          type
          education_level
        }
    }  
`;

export const GET_YEARS = gql`
    query GET_YEARS(
        $first: Int!
        $page: Int!
        $active: Boolean
        $orderBy: [OrderByClause!]
    ){
      getYears(first:$first,page:$page,active:$active,orderBy:$orderBy){
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

export const GET_USERS = gql`
    query GET_USERS(
        $first: Int!
        $page: Int!
        $group_id:Int
    ){
    getUsers(first:$first,page:$page,group_id:$group_id){
        data{
          id
          first_name
          last_name
        }
      }
    }  
`;