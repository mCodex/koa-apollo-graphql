import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import bodyParser from 'koa-bodyparser';
import graphQLDefsAndResolvers from './graphql';

const server = new ApolloServer({
  schema: graphQLDefsAndResolvers,
  introspection: true,
  playground: true
});

const app = new Koa();

app.use(bodyParser());

const httpServer = app.listen({ port: 4000 }, () => console.log(`🚀 Server opened at http://localhost:4000${server.graphqlPath}`));

server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);
