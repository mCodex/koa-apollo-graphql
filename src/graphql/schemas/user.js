import { PubSub } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../defs/user';

import {
  insertUser,
  getUser,
  insertUserToken
} from '../../db';

import {
  USER_ADDED
} from '../../constants';

const pubsub = new PubSub();

const resolvers = {
  Subscription: {
    userAdded: {
    // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([USER_ADDED]),
    },
  },
  Query: {
    async findUser(_, { _id }) {
      const user = await getUser(_id);
      return user;
    },
  },
  Mutation: {
    async createUser(_, { email, password }) {
      const user = await insertUser(email, password);
      const { _id } = user;
      const userWithToken = await insertUserToken(_id);
      pubsub.publish(USER_ADDED, { userAdded: userWithToken });
      return userWithToken;
    },
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
