import { usersResolver, updateUserResolver, currentUserResolver } from './modules/user/resolvers';
import { DateTimeResolver, EmailResolver } from './modules/customTypes/resolvers';

const resolvers = {
  Query: {
    currentUser: currentUserResolver,
    users: usersResolver,
  },
  Mutation: {
    updateUser: updateUserResolver,
  },
  DateTime: DateTimeResolver,
  Email: EmailResolver,
};

export default resolvers;
