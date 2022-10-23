import { Field } from "redux-form";
import "./form.scss";

const renderField = ({ input, options = [], meta: { touched, error } }) => (
  <div>
    <select {...input} className="dropdown">
      <option></option>
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {touched && error && <div className="form-field-error">{error}</div>}
  </div>
);

const Select = ({ label, name, options }) => {
  return (
    <div className="form-field">
      <label className="form-field-label">
        {label}
        <b style={{ color: "red" }}> *</b>
      </label>
      <div className="form-field-component">
        <Field name={name} component={renderField} options={options} />
      </div>
    </div>
  );
};

export default Select;
