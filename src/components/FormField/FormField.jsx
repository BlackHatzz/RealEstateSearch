import { ErrorMessage, Field } from "formik";

export const FormField = ({
  name,
  label,
  type = "text",
  placeholder,
  maxlength,
  size,
}) => (
  <label>
    {label}
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      maxlength={maxlength}
      size={size}
    />
    <ErrorMessage className="error" component="div" name={name} />
  </label>
);
