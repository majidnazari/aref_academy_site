import { gql } from "@apollo/client";

export const CREATE_CONSULTANT_DEFINITION_DETAIL = gql`
  mutation CREATE_CONSULTANT_DEFINITION_DETAIL(
    $branch_class_room_id: Int
    $consultant_id: Int!
    $days: [DaysOfWeek]
    $end_hour: String!
    $start_hour: String!
    $step: Int!
    $week:Week
  ) {
    createConsultantDefinitionDetail(
      input: {
        branch_class_room_id:$branch_class_room_id
        consultant_id: $consultant_id
        days: $days
        end_hour: $end_hour
        start_hour: $start_hour
        step: $step
        week:$week
      }
    ) {
      id
    }
  }
`;

export const UPDATE_CONSULTANT_DEFINITION_DETAIL_STUDENT_ID=gql`
mutation UPDATE_STUDENT_OF_CONSULTANTDEFINITIONDETAIL
(
  $id:ID!
  $student_id:Int!
)
{
    updateConsultantDefinitionDetail(input:{
       id:$id,
      student_id:$student_id
    })
  {
    id
    consultant_id
    student_id
    branch_class_room_id
    consultant_test_id
    user_id
    start_hour
    end_hour
    session_date
  } 
}
`;
