import { usersResolver } from './modules/user/resolvers';

const resolvers = {
  Query: {
    users: usersResolver,
  },
};

export default resolvers;
