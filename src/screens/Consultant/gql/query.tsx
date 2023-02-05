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

export const GET_A_COSULTANT = gql`
query GET_A_CONSULTANT($id:ID!){
  consultant(_id:$id){
    _id
    timeTable{
      dayOfWeek
      startEnd{
        start
        end
      }
    }
    userId
  }
}
`;

export const GET_CONSULTANTS = gql`
    query GET_USERS(
        $first: Int!
        $page: Int!
        $first_name:String
        $last_name:String
        $email:String
    ){
    getUsers(first:$first,page:$page group_id: 6 , first_name:$first_name , last_name:$last_name, email:$email){
        data{
          id
          first_name
          last_name
          email
          group{
            persian_name
          }
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