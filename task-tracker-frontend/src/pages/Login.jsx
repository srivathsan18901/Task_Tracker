import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [empCode, setEmpCode] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await API.post("/auth/login", { empCode, password });
    login(res.data);
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div className="card" style={{ width: "300px" }}>
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        <input
          placeholder="Emp Code"
          onChange={(e) => setEmpCode(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: "10px" }}
        />

        <button className="btn" onClick={handleLogin} style={{ marginTop: "15px", width: "100%" }}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f1117"
  }
};