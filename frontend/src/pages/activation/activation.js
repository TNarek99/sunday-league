import React, { useCallback, useContext } from 'react'
import useActivateUserForm from './activate_user_form';
import UserContext from '../../contexts/user/user_context';
import { Redirect } from 'react-router-dom';
import { STATUS_ACTIVE, GENDER_MALE, GENDER_FEMALE } from '../../common/constants/users';
import InputWithLabel from '../../components/input_with_label/input_with_label';

import './styles.css';

const Activation = () => {
  const { currentUser, activateUser } = useContext(UserContext);

  const submitActivateUser = useCallback((userInput) => {
    activateUser({ ...userInput, shirtNumber: Number(userInput.shirtNumber) });
  }, [activateUser]);

  const form = useActivateUserForm(submitActivateUser);

  if (currentUser.status === STATUS_ACTIVE) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={form.handleSubmit} className="user-activation">
      <InputWithLabel
        label="email"
        name="email"
        onChange={form.handleChange}
        showError={form.touched.email && form.errors.email}
        error={form.errors.email}
        value={form.values.email}
      />
      <InputWithLabel
        label="first name"
        name="firstName"
        onChange={form.handleChange}
        showError={form.touched.firstName && form.errors.firstName}
        error={form.errors.firstName}
        value={form.values.firstName}
      />
      <InputWithLabel
        label="last name"
        name="lastName"
        onChange={form.handleChange}
        showError={form.touched.lastName && form.errors.lastName}
        error={form.errors.lastName}
        value={form.values.lastName}
      />
      <label htmlFor="gender">Gender</label>
      <select name="gender" onChange={form.handleChange} value={form.values.gender}>
        <option value={GENDER_MALE}>Male</option>
        <option value={GENDER_FEMALE}>Female</option>
      </select>
      {form.touched.gender && form.errors.gender ? (
        <div>{form.errors.gender}</div>
      ) : null}
      <InputWithLabel
        label="birth date"
        name="birthDate"
        onChange={form.handleChange}
        showError={form.touched.birthDate && form.errors.birthDate}
        error={form.errors.birthDate}
        value={form.values.birthDate}
      />
      <InputWithLabel
        label="shirt number"
        name="shirtNumber"
        onChange={form.handleChange}
        showError={form.touched.shirtNumber && form.errors.shirtNumber}
        error={form.errors.shirtNumber}
        value={form.values.shirtNumber}
      />
      <input type="submit" onClick={form.handleSubmit} />
    </form>
  )
};

export default Activation;
