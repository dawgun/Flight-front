import { ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import App from "../App/App";
import "react-toastify/dist/ReactToastify.css";
import "./Layout.css";

function Layout() {
  return (
    <div className="app-container">
      <ToastContainer />
      <Header />
      <App />
    </div>
  );
}

export default Layout;
