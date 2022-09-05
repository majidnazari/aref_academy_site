import { gql } from '@apollo/client';

export const GET_STUDENTS = gql`
    query GET_STUDENTS(
        $first: Int!
        $page: Int!
        $first_name: String
        $last_name: String
        $orderBy: [OrderByClause!]
        $phone: String
        $nationality_code: String
    ){
      getStudents(
          first: $first,
          page: $page,
          first_name: $first_name,
          last_name: $last_name,
          orderBy: $orderBy,
          phone: $phone
          nationality_code:$nationality_code
          )
        {
          data{
            id
            first_name
            last_name
            phone
            mother_phone
            father_phone
            home_phone
            major
            egucation_level
            parents_job_title
            nationality_code
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
      getStudent(id:$id){
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
        nationality_code
      }
    }  
`;