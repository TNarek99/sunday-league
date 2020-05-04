
import { GraphQLServer } from 'graphql-yoga';
import { schema, resolvers, context } from './api';

const app = new GraphQLServer({
  typeDefs: schema,
  resolvers,
  context,
  graphiql: true,
});

export default app;
