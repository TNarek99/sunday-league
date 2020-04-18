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

export function usersResolver() {
  return users;
}

export function userResolver(id) {
  return users.find((user) => user.id === id);
}
