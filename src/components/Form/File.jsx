import { Field } from "redux-form";
import { toast } from "react-toastify";
import "./form.scss";

const renderField = ({ input, meta: { touched, error } }) => {
  const onChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.size > 20971520) {
      input.onChange("");
      e.target.value = "";
      toast.error("File size should be below than 20Mb.");
    } else {
      input.onChange(file);
    }
  };

  return (
    <div>
      <input
        className="form-field-file"
        type="file"
        accept=".jpg, .jpeg, .gif, .png, .pdf"
        onChange={onChange}
      />
      <div className="form-field-file-message">
        Accepted file types: jpg, jpeg, gif, png, pdf, Max. file size: 20 MB.
      </div>
      {touched && error && <div className="form-field-error">{error}</div>}
    </div>
  );
};

const File = ({ label, name }) => {
  return (
    <div className="form-field">
      <label className="form-field-label">
        {label}
        <b style={{ color: "red" }}> *</b>
      </label>
      <div className="form-field-component">
        <Field name={name} component={renderField} />
      </div>
    </div>
  );
};

export default File;
