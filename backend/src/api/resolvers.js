import { activateUserResolver, currentUserResolver, updateUserResolver } from './modules/user/resolvers';
import { DateTimeResolver, EmailResolver } from './modules/customTypes/resolvers';

const resolvers = {
  Query: {
    currentUser: currentUserResolver,
  },
  Mutation: {
    activateUser: activateUserResolver,
    updateUser: updateUserResolver,
  },
  DateTime: DateTimeResolver,
  Email: EmailResolver,
};

export default resolvers;
