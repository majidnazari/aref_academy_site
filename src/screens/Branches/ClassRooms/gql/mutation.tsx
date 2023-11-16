import { gql } from "@apollo/client";

export const DELETE_CLASSROOM = gql`
  mutation DELETE_CLASSROOM($id: ID!) {
    deleteBranchClassRoom(id: $id) {
      id
    }
  }
`;

export const CREATE_CLASSROOM = gql`
  mutation CREATE_CLASSROOM(
    $name: String
    $branch_id: Int
    $description: String
  ) {
    createBranchClassRoom(
      input: { name: $name, branch_id: $branch_id, description: $description }
    ) {
      id
    }
  }
`;



export const EDIT_BRANCH_CLASS_ROOM = gql`
  mutation EDIT_BRANCH_CLASS_ROOM(
    $id: Int!
    $branch_id: Int
    $description: String
    $name: String
  ) {
    updateBranchClassRoom(
      input: {
        id: $id
        branch_id: $branch_id
        description: $description
        name: $name
      }
    ) {
      id
      branch_id
      name
      description
    }
  }
`;
