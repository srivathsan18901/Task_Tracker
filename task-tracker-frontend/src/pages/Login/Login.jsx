import { useState, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import bg from "../../assets/Bg.gif";
import logo from "../../assets/Logo.png";
import TextField from "@mui/material/TextField";
import bgi from "../../assets/Background.jpg";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [empCode, setEmpCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await API.post("/auth/login", { empCode, password });
    login(res.data);
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(158, 138, 138, 0.57), rgba(153, 153, 153, 0.28)), url(${bgi})`,
        backgroundSize: "cover",
      }}
    >
      <div className="login">
        {/* <img
          src={bg}
          alt="Bgimg"
          className="GIF"
          style={{ filter: "drop-shadow(0 0 10px #7b86b9)" }}
        /> */}
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
              type={showPassword ? "text" : "password"}
              variant="standard"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginTop: "15px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <button className="LoginBTN" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
