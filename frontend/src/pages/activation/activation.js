import React, { useCallback, useContext } from 'react'
import { useActivateUser } from '../../api/services/users';
import useActivateUserForm from './activate_user_form';
import UserContext from '../../contexts/authentication/user_context';
import { Redirect } from 'react-router-dom';
import { STATUS_ACTIVE, GENDER_MALE, GENDER_FEMALE } from '../../common/constants/users';


const Activation = () => {
  const { fetchCurrentUser, currentUser } = useContext(UserContext);
  const { activateUser, loading } = useActivateUser(
    () => { fetchCurrentUser() },
  );

  const submitActivateUser = useCallback((userInput) => {
    if (!loading) {
      activateUser({ ...userInput, shirtNumber: Number(userInput.shirtNumber) });
    }
  }, [activateUser, loading]);

  const form = useActivateUserForm(submitActivateUser);

  if (currentUser.status === STATUS_ACTIVE) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={form.handleSubmit}>
      <label htmlFor="email">Email</label>
      <input name="email" onChange={form.handleChange} />
      {form.touched.email && form.errors.email ? (
        <div>{form.errors.email}</div>
      ) : null}
      <label htmlFor="firstName">First Name</label>
      <input name="firstName" onChange={form.handleChange} />
      {form.touched.firstName && form.errors.firstName ? (
        <div>{form.errors.firstName}</div>
      ) : null}
      <label htmlFor="lastName">Last Name</label>
      <input name="lastName" onChange={form.handleChange} />
      {form.touched.lastName && form.errors.lastName ? (
        <div>{form.errors.lastName}</div>
      ) : null}
      <label htmlFor="gender">Gender</label>
      <select name="gender" onChange={form.handleChange} value={form.values.gender}>
        <option value={GENDER_MALE}>Male</option>
        <option value={GENDER_FEMALE}>Female</option>
      </select>
      {form.touched.gender && form.errors.gender ? (
        <div>{form.errors.gender}</div>
      ) : null}
      <label htmlFor="birthDate">Birth Date</label>
      <input name="birthDate" onChange={form.handleChange} />
      {form.touched.birthDate && form.errors.birthDate ? (
        <div>{form.errors.birthDate}</div>
      ) : null}
      <label htmlFor="shirtNumber">Prefered Shirt Number</label>
      <input name="shirtNumber" onChange={form.handleChange} />
      {form.touched.shirtNumber && form.errors.shirtNumber ? (
        <div>{form.errors.shirtNumber}</div>
      ) : null}
      <input type="submit" onClick={form.handleSubmit} />
    </form>
  )
};

export default Activation;
