import Logo from "../../assests/logo.png";
import "../MainDashboard.css";

function HeaderMain() {
  const refreshPage = () => {
    window.location.reload();
    document.documentElement.scrollTop = 0;
  };

  return (
    <header className="dash-header1">
      <img
        src={Logo}
        alt="Sports Hub Logo"
        onClick={refreshPage}
        className="logo1"
      />
    </header>
  );
}

export default HeaderMain;
