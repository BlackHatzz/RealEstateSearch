import { ErrorMessage, Field } from 'formik';

export const FormField = ({ name, label, type = 'text', placeholder }) => (
  <label>
    {label}
    <Field name={name} type={type} placeholder={placeholder} />
    <ErrorMessage className="error" component="div" name={name} />
  </label>
);
