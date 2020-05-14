import * as Yup from 'yup';

export const createGameSchema = Yup.object({
  date: Yup.date()
    .min(new Date(), 'Date cannot be in the past')
    .required('Game Date is required'),
  location: Yup.string()
    .required('Location is required'),
  teamCapacity: Yup.number()
    .max(22, 'Team cannot have more than 22 players')
    .min(3, 'Team Cannot have less than 3 players')
    .integer('Must be an integer')
    .required('Team Capacity is required'),
  type: Yup.string()
    .matches(/(OPEN|PRIVATE|CLOSED)/, 'Game must be Open, Private or Closed')
});