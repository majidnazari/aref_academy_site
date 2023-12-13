import { gql } from "@apollo/client";
export const GET_COURSES_STUDENTS = gql`
  query GET_COURSES_STUDENTS(
    $first: Int!
    $page: Int
    $student_id: Int
    $course_id: Int
    $financial_status: String
    $manager_status: String
    $student_status: String
    $total_present: Int
    $to_date: String
    $from_date: String
    $orderBy: [OrderByClause!]
  ) {
    getCourseStudents(
      first: $first
      page: $page
      student_id: $student_id
      course_id: $course_id
      financial_status: $financial_status
      manager_status: $manager_status
      student_status: $student_status
      total_present: $total_present
      from_date: $from_date
      to_date: $to_date
      orderBy: $orderBy
    ) {
      data {
        id
        student {
          id
          first_name
          last_name
          phone
        }
        student_status
        user_student_status {
          first_name
          last_name
        }
        user_creator {
          first_name
          last_name
        }
        manager_status
        user_manager {
          first_name
          last_name
        }
        financial_status
        user_financial {
          first_name
          last_name
        }
        created_at
        financial_status_updated_at
        course {
          name
          lesson {
            name
          }
          type
          teacher {
            first_name
            last_name
          }
          education_level
        }
        sum_total_present
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

export const GET_COURSES = gql`
  query GET_COURSES($first: Int!, $page: Int!) {
    getCourses(first: $first, page: $page) {
      data {
        id
        name
        lesson {
          id
          name
        }
        type
        teacher {
          first_name
          last_name
        }
        education_level
      }
    }
  }
`;

export const GET_STUDENTS = gql`
  query GET_STUDENTS(
    $first: Int!
    $page: Int!
    $full_name: String
    $orderBy: [OrderByClause!]
  ) {
    getStudents(
      first: $first
      page: $page
      full_name: $full_name
      orderBy: $orderBy
    ) {
      data {
        id
        first_name
        last_name
        phone
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

export const GET_CONSULTANT_FINANCIAL_REPORT = gql`
  query GET_CONSULTANT_FINANCIAL_REPORT(
  	$date_from:String
    $date_to:String
    $consultant_id:Int
    $description:String
    $financial_refused_status:FinancialRefusedStatus 
    $financial_status:FinancialStatus
    $manager_status:ManagerStatus
    $student_id:Int
    $student_status:StudentStatusConsultantFinancial    
    $total_present:Int,
    $first:Int!,
    $page:Int,
    $orderBy: [OrderByClause!]
){
  getConsultantFinancials(
    date_from:$date_from
    date_to: $date_to
    consultant_id:$consultant_id
    description:$description
    financial_refused_status:$financial_refused_status
    financial_status:$financial_status
    manager_status:$manager_status
    student_id:$student_id
    student_status: $student_status    
    total_present: $total_present,
    first: $first,
    page:$page,
    orderBy: $orderBy   
  
  )
  {
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
    data{
      id
      student_id
      student{
        id
        first_name
        last_name
        phone
      }
   		user_id_creator
      branch_id
      branch{
        id
        name
      }
      consultant_id
      consultant{
        id
        first_name
        last_name
      }
      year_id
      year{
        name
      }
      manager_status
      financial_status
      student_status
      financial_refused_status
      user_id_manager
      user_id_financial
      financial{
        id
        first_name
        last_name
      }
      manager{
        id
        first_name
        last_name
      }
      user{
        id
        first_name
        last_name
      }
      userStudentStatus{
        id
        first_name
        last_name
      }
      user_id_student_status
      description
      financial_status_updated_at
      
    }
    
  }
}
  
`;

export const GET_CONSULTANTS = gql`
  query GET_CONSULTANTS(
    $first: Int!
    $page: Int!
    $first_name: String
    $last_name: String
    $email: String
  ) {
    getConsultants(
      first: $first
      page: $page
      first_name: $first_name
      last_name: $last_name
      email: $email
    ) {
      data {
        id
        first_name
        last_name
        email
        group {
          persian_name
          __typename
        }
        branch {
          name
          __typename
        }
        __typename
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
        __typename
      }
      __typename
    }
  }
`;
