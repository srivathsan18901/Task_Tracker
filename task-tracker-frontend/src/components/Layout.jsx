import Sidebar from "./sideBar/Sidebar";
import bgi from "../assets/TempBg.jpg";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundImage: `linear-gradient(rgba(221, 217, 217, 0), rgba(255, 251, 251, 0)), url(${bgi})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </div>
    </div>
  );
}
