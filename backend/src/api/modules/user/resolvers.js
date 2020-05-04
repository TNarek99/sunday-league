import userService from '../../../modules/user/services/user.service';

const users = [
  {
    id: 1,
    firstName: 'Mark',
    lastName: 'Zuckerberg',
  },
  {
    id: 2,
    firstName: 'Eduardo',
    lastName: 'Saverin',
  },
];

export async function usersResolver() {
  return userService.getUsers();
}

export function userResolver(id) {
  return users.find((user) => user.id === id);
}
