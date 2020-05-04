
import { GraphQLServer } from 'graphql-yoga';
import { schema, resolvers, context } from './api';

const app = new GraphQLServer({
  typeDefs: schema,
  resolvers,
  context,
  graphiql: true,
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
});

export default app;
