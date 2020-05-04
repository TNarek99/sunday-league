import { usersResolver, updateUserResolver } from './modules/user/resolvers';

const resolvers = {
  Query: {
    users: usersResolver,
  },
  Mutation: {
    updateUser: updateUserResolver,
  },
};

export default resolvers;
