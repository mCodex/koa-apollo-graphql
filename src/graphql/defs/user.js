import { gql } from 'apollo-server-koa';

const typeDefs = gql`
  type User {
      _id: ID,
      email: String!
      password: String!,
      token: String
    }

  type Subscription {
    userAdded: User
  }

  # the schema allows the following query:
  type Query {
    findUser(
      _id: String!
    ): User
  }

  type Mutation {
    createUser (
      email: String!
      password: String!
    ): User
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: Query
    mutation: Mutation,
    subscription: Subscription
  }
`;

export default typeDefs;
