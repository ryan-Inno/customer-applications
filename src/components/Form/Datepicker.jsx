import { Field } from "redux-form";
import DatePicker from "react-date-picker";
import "./form.scss";

const renderField = ({ input, meta: { touched, error } }) => (
  <div>
    <DatePicker
      {...input}
      value={input.value}
      format="MM/dd/yyyy"
      dayPlaceholder="dd"
      monthPlaceholder="mm"
      yearPlaceholder="yyyy"
      popperPlacement="bottom-end"
      clearIcon={null}
    />
    {touched && error && <div className="form-field-error">{error}</div>}
  </div>
);

const Datepicker = ({ label, name }) => {
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
          onBlur={(e) => {
            e.preventDefault();
          }}
        />
      </div>
    </div>
  );
};

export default Datepicker;
