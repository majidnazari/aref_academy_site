import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION(
    $username: String!
    $password: String!
  ) {
    login(input:{username: $username, password: $password}) {
        access_token
        refresh_token
        expires_in
        token_type
        user {
          id
          email
          first_name
          last_name
          created_at
          updated_at
          group{
            name
            menus {
                id
                slug
                name
                icon
                href
            }
          }
        }
    }
  }
`;
