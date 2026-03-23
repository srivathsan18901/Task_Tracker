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
          backgroundImage: `linear-gradient(rgba(158, 138, 138, 0.57), rgba(153, 153, 153, 0.28)), url(${bgi})`,
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
