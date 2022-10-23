import "./page.scss";

const Header = ({ title = "", color = "#1a458b" }) => {
  return (
    <div className="page-header" style={{ color }}>
      {title}
    </div>
  );
};

export default Header;
