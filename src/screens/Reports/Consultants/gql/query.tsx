import { gql } from "@apollo/client";

export const GET_CONSULTANT_REPORT = gql`
  query GET_CONSULTANT_DEFINITION_DETAILS_GENERAL_REPORT(
    $consultant_id: Int
    $session_date_from: String
    $session_date_to: String
    $student_id: Int
  ) {
    getConsultantDefinitionDetailsGenerealReport(
      consultant_id: $consultant_id
      session_date_from: $session_date_from
      session_date_to: $session_date_to
      student_id: $student_id
    ) {
      consultant_fullname
      total_consultant_students
      total_consultant_definition

      total_student_present_hours
      total_student_present

      total_student_absence_hours
      total_student_absence

      total_student_delay_hours
      total_student_delay

      total_consultant_obligation_hours
      total_consultant_present_hours
      total_consultant_absence_hours
      total_consultant_earlier_hours

      details {
        id
        consultant_id
        student_id
        branch_class_room_id
        consultant_test_id
        user_id
        start_hour
        end_hour
        session_date
        student_status
        consultant_status
        session_status
        absent_present_description
        step
        consultant {
          id
          first_name
          last_name
        }
        user {
          id
          first_name
          last_name
        }
      }
    }
  }
`;


export const GET_CONSULTANTS=gql`
query GET_ALL_CONSULTANT($first:Int!  $page:Int){
  getConsultants(
    first:$first
    page:$page
  ){
    data{
      id
      first_name
      last_name
    }
  }
}
`;