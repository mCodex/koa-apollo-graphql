import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';

import graphQLDefsAndResolvers from './graphql';

const server = new ApolloServer({ schema: graphQLDefsAndResolvers });

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server opened at http://localhost:4000${server.graphqlPath}`));
