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
      autoComplete="off"
      name={name}
      type={type}
      placeholder={placeholder}
      maxLength={maxlength}
      size={size}
    />
    <ErrorMessage className="error" component="div" name={name} />
  </label>
);
