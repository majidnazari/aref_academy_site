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
// export const GET_COSULTANT_TESTS=gql`

// `;

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
export const GET_COSULTANT_TESTS = gql`
   query GET_COSULTANT_TESTS
   (
    $first:Int!,
    $page:Int!, 
    $code:Int,
    $lessonId:Int,
    $level:TestLevel,
    $subject:String
    ){
  tests(test:{
    first:$first 
    page:$page
    code:$code
    lessonId:$lessonId
    level:$level
    subject:$subject
    
  }) 
  {
    data{
       _id
    code
    lessonId
    level
    subject
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

export const  GET_A_COSULTANT_TEST= gql`
query GET_A_TEST(
  $_id:ID!
){
  test(_id:$_id){
    _id
    code
    lessonId
    level
    subject    
  }
}
`;