import { gql } from '@apollo/client';

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


export const GET_LESSONS = gql`
  query GET_LESSONS($first: Int!, $page: Int, $orderBy: [OrderByClause!] , $name:String) {
    getLessons(first: $first, page: $page, orderBy: $orderBy , name:$name) {
      data {
        id
        name
      }
      paginatorInfo {
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