import { gql } from "@apollo/client";

export const GET_A_COSULTANT = gql`
  query GET_A_CONSULTANT($id: ID!) {
    consultant(_id: $id) {
      _id
      timeTable {
        dayOfWeek
        startEnd {
          start
          end
        }
      }
      userId
      step
    }
  }
`;

export const GET_CONSULTANTS = gql`
  query GET_USERS(
    $first: Int!
    $page: Int!
    $first_name: String
    $last_name: String
    $email: String
  ) {
    getUsers(
      first: $first
      page: $page
      group_id: 6
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
        }
        branch {
          name
        }
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

export const GET_LESSONS = gql`
  query GET_LESSONS(
    $first: Int!
    $page: Int
    $orderBy: [OrderByClause!]
    $name: String
  ) {
    getLessons(first: $first, page: $page, orderBy: $orderBy, name: $name) {
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

export const GET_BRANCH_CLASSROOMS = gql`
  query GET_BRANCH_CLASSROOMS(
    $first: Int!
    $page: Int
    $orderBy: [OrderByClause!]
  ) {
    getBranchClassRooms(first: $first, page: $page, orderBy: $orderBy) {
      data {
        id
        name
        branch {
          name
        }
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

export const GET_CONSULTANT_DEFINITION_DETAILS = gql`
  query GET_CONSULTANT_DEFINITION_DETAILS(
    $absent_present_description: String
    $branch_class_room_id: Int
    $consultant_id: Int
    $consultant_test_id: Int
    $end_hour_from: String
    $end_hour_to: String
    $session_date_from: Date
    $session_date_to: Date
    $start_hour_from: String
    $start_hour_to: String
    $step: Int
    $student_id: Int
    $student_status: [StudentStatus]
    $test_description: String
    $user_id: Int
    $next_week:Boolean
  ) {
    getConsultantDefinitionDetails(
      absent_present_description: $absent_present_description
      branch_class_room_id: $branch_class_room_id
      consultant_id: $consultant_id
      consultant_test_id: $consultant_test_id
      end_hour_from: $end_hour_from
      end_hour_to: $end_hour_to

      session_date_from: $session_date_from
      session_date_to: $session_date_to
      start_hour_from: $start_hour_from
      start_hour_to: $start_hour_to
      step: $step
      student_id: $student_id
      student_status: $student_status
      test_description: $test_description
      user_id: $user_id
      next_week:$next_week
    ) {
      date
      details {
        consultant_id
        id
        consultant_id
        consultant_first_name
        student_id
        student {
          first_name
          last_name
          is_academy_student
          egucation_level
          concours_year
          father_phone
          home_phone
          major
          mother_phone
          nationality_code
          student_phone
        }
        branch_class_room_id
        start_hour
        end_hour
        session_date
        branchClassRoom_name
      }
    }
  }
`;

export const GET_STUDENTS = gql`
  query GET_STUDENTS(
    $first: Int!
    $page: Int!
    $first_name: String
    $last_name: String
    $orderBy: [OrderByClause!]
    $phone: String
    $nationality_code: String
  ) {
    getStudents(
      first: $first
      page: $page
      first_name: $first_name
      last_name: $last_name
      orderBy: $orderBy
      phone: $phone
      nationality_code: $nationality_code
    ) {
      data {
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

export const GET_A_USER = gql`
  query GET_A_USERS($id: ID!) {
    getUser(id: $id) {
      id
      first_name
      last_name
      email
    }
  }
`;


export const GET_A_CONSULTANT_TIME_TABLE=gql`
query GET_CONSULTANT_DEFINITION_DETAIL($id:ID!){
  getConsultantDefinitionDetail(id:$id){
    id
    consultant_id
    start_hour
    end_hour
    session_date
  }
}
`;

export const GET_CONSULTANT_SHOW_TIMES=gql`
# Write your query or mutation here
query GET_CONSULTANTS_TIME_SHOW(
  $consultant_id:Int,
  $target_date:String
){
  getConsultantsTimeShow
  (
    consultant_id: $consultant_id,
    target_date:$target_date
  ){
    consultant{
      id
      first_name
      last_name
      email
      branch{
        id
        name        
      }
      
    }
    times{
      id
      student_id
      session_date
      start_hour
      end_hour
      branch_class_room_id
      student_status
      absent_present_description
      test_description
      step
      branchClassRoom{
        id
        name        
      }
      
      
    }
  }
}
`;