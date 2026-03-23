import { useState, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import bg from "../../assets/Bg.gif";
import logo from "../../assets/Logo.png";
import TextField from "@mui/material/TextField";

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
    <div className="login">
      <img src={bg} alt="Bgimg" />
      <div className="logincard">
        <img src={logo} alt="Logo" style={{ height: "100px" }} />
        <h1>LOGIN</h1>
        <div className="LoginInp">
          <TextField
            label="Employee Code"
            variant="standard"
            fullWidth
            onChange={(e) => setEmpCode(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: "15px" }}
          />
        </div>

        <button
          className="btn"
          onClick={handleLogin}
          style={{ marginTop: "15px", width: "100%" }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
