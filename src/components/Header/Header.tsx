import logo from "/logo.svg";
import "./Header.css";

function Header() {
  return (
    <header className={"header"}>
      <img
        src={logo}
        height={58}
        width={58}
        alt={"Logo of flight-radar web"}
      ></img>
      <h1 className={"header-title"}>Flight-Radar</h1>
    </header>
  );
}

export default Header;
