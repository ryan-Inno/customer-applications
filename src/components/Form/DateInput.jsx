import { isNil } from "lodash";
import { Field } from "redux-form";
import "./form.scss";

const renderField = ({ input, type, meta: { touched, error } }) => {
  const onChange = (e) => {
    let value = e.target.value;
    if (!isNil(value.match(/^\d{2}$/))) {
      input.onChange(value + "/");
    } else if (!isNil(value.match(/^\d{2}\/\d{2}$/))) {
      input.onChange(value + "/");
    } else {
      input.onChange(value);
    }
  };
  return (
    <div>
      <input
        {...input}
        placeholder="mm/dd/yyyy"
        type={type}
        onChange={onChange}
      />
      <div className="form-field-helptext">
        For ex. 01/31/1999 or 12/31/1991
      </div>
      {touched && error && <div className="form-field-error">{error}</div>}
    </div>
  );
};

const DateInput = ({ label, name }) => {
  return (
    <div className="form-field">
      <label className="form-field-label">
        {label}
        <b style={{ color: "red" }}> *</b>
      </label>
      <div className="form-field-component">
        <Field name={name} component={renderField} type="text" />
      </div>
    </div>
  );
};

export default DateInput;
