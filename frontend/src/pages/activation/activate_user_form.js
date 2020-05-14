import { useFormik } from 'formik';
import { activateUserSchema } from '../../utils/validation/user/schema';

const useActivateUserForm = (onSubmit) => {
  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    gender: 'MALE',
    birthDate: '',
    shirtNumber: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: activateUserSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit,
  });

  return { ...formik }
};

export default useActivateUserForm;