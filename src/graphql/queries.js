import { gql } from "graphql-request";

export const GET_ALL_LPS = gql`
query {
    landingPages {
      id
    }
}
`

export const GET_CONTENT = gql`
query ($id: ID) {
    landingPage(where: { id: $id }) {
      logo{
        url
      }
      navigation {
        name
        href
      }
      title
      highlight
      description
      action {
        name
        href
        type
      }
      hero{
        url
      }
    }
  }
`