
import { GraphQLServer } from 'graphql-yoga';
import { schema, resolvers } from './api';

const app = new GraphQLServer({
  typeDefs: schema,
  resolvers,
  graphiql: true,
});

export default app;
