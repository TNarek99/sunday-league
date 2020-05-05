
import { ApolloServer } from 'apollo-server';
import {
  schema, resolvers, context, formatError,
} from './api';

const app = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context,
  graphiql: true,
  cors: true,
  formatError,
});

export default app;
