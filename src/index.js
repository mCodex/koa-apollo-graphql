import Koa from 'koa';
import http from 'http';
import { ApolloServer } from 'apollo-server-koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import graphQLDefsAndResolvers from './graphql';

require('dotenv').config();

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

/* Converting ObjectID to String automatically. GraphQL doesn't support this kind of type anymore */
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () { //eslint-disable-line
  return this.toString();
};

const PORT = 4000;

const server = new ApolloServer({
  schema: graphQLDefsAndResolvers,
  introspection: true,
  playground: true,
  context: ({ ctx }) => {
  // get the user token from the headers
    // const token = ctx.headers.authorization || '';
    // console.log(token);
    // try to retrieve a user with the token
    // const user = getUser(token);
    //
    // // add the user to the context
    // return { user };
  },
});

const app = new Koa();

app.use(bodyParser());

const httpServer = app.listen({ port: 4000 }, () => console.log(`🚀 Server opened at http://localhost:4000${server.graphqlPath}`));

// const httpServer = http.createServer(app);
server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);

// httpServer.listen(PORT, () => {
//   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
//   console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
// });
