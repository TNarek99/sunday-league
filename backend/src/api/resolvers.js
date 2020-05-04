import { usersResolver, updateUserResolver, currentUserResolver } from './modules/user/resolvers';

const resolvers = {
  Query: {
    currentUser: currentUserResolver,
    users: usersResolver,
  },
  Mutation: {
    updateUser: updateUserResolver,
  },
};

export default resolvers;
