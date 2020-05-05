
import { ApolloServer } from 'apollo-server';
import { schema, resolvers, context } from './api';

const app = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context,
  graphiql: true,
  cors: true,
});

export default app;
