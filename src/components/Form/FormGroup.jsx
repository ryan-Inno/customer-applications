import "./form.scss";

const FormGroup = ({ title = "", subTitle = "", children }) => {
  return (
    <div className="form-group">
      <div className="form-group-title">{title}</div>
      {subTitle && <div className="form-group-subtitle">{subTitle}</div>}
      <div className="form-group-children">{children}</div>
    </div>
  );
};

export default FormGroup;
