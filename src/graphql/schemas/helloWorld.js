import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../defs/helloWorld';

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
