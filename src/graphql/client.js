import { GraphQLClient } from 'graphql-request'

export const graphcmsClient = new GraphQLClient(
    process.env.GRAPHQL_URL,
    {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`
      }
    }
);
  