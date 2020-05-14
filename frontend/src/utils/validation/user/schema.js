import * as Yup from 'yup';

export const activateUserSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be at most 15 characters')
    .required('Required'),
  lastName: Yup.string()
    .max(15, 'Must be at most 15 characters')
    .required('Required'),
  shirtNumber: Yup.number()
    .max(99, 'Cannot be greater than 99')
    .min(1, 'Cannot be less than 1')
    .integer('Must be an integer')
    .required('Shirt number is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is requiered'),
  birthDate: Yup.date()
    .max(new Date())
    .required('Birthday is required'),
  gender: Yup.string()
    .matches(/(MALE|FEMALE)/)
    .required('Gender is Required'),
});