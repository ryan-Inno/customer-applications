import LoadingIcon from "../LoadingIcon";
import "./index.scss";

const Loader = ({ show = false }) =>
  !show ? null : (
    <div className="loader-overlay">
      <LoadingIcon />
    </div>
  );

export default Loader;
