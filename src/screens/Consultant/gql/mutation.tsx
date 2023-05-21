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
