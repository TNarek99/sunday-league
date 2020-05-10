import { useFormik } from 'formik';
import { createGameSchema } from '../../utils/validation/game/schema';

const useCreateGameForm = (onSubmit) => {
  const initialValues = {
    type: 'OPEN',
    teamCapacity: 3,
    date: '',
    location: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: createGameSchema,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  });

  return { ...formik };
};

export default useCreateGameForm;