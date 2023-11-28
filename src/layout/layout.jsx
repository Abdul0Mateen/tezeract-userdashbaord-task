import "./layout.css";
import sideMenuIcon from "../assets/images/side-menu.png";
import SideBar from "./side-bar/sideBar";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const [sideMenu, setSideMenu] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 992) {
      setSideMenu(true);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 992) {
      setSideMenu(true);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={`layoutContainer ${sideMenu && "hideSideMenu"}`}>
      <div className="sideMenuToggle">
        <img src={sideMenuIcon} alt="" onClick={() => setSideMenu(!sideMenu)} />
      </div>
      <div className="sideCompWrapper">
        <SideBar />
      </div>
      <div className="layoutChildWrapper">{children}</div>
    </div>
  );
};

export default Layout;
