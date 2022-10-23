import { Field } from "redux-form";
import "./form.scss";

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error },
}) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} />
    {touched && error && <div className="form-field-error">{error}</div>}
  </div>
);

const Input = ({ label, name, placeholder }) => {
  return (
    <div className="form-field">
      <label className="form-field-label">
        {label}
        <b style={{ color: "red" }}> *</b>
      </label>
      <div className="form-field-component">
        <Field
          name={name}
          component={renderField}
          type="text"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
