import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import fullLogo from "../../assets/fullLogo.png";
import iconLogo from "../../assets/halflogo.png";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { name: "Overview", path: "/dashboard", icon: <DashboardIcon /> },
    { name: "Daily Report", path: "/create-report", icon: <DescriptionIcon /> },
  ];

  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <img src={isOpen ? fullLogo : iconLogo} alt="Logo" className="logo" />
      <div className="menu">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`link ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.icon}
            {isOpen && <span className="text">{item.name}</span>}
          </Link>
        ))}
      </div>

      <div className="bottom">
        <Link to="/" className="link">
          <LogoutIcon />
          {isOpen && <span className="text">Logout</span>}
        </Link>
      </div>
    </div>
  );
}
