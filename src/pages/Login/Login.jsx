import { useState } from "react";
import "./login.css";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  loginFailure,
  loginStart,
} from "../../Redux/Slices/UserSlice.jsx";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Container, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AreaTop from "../../components/dashboard/areaTop/AreaTop.jsx";
// import { AreaTop } from "../../components/index.js";

const api = axios.create({
  baseURL: URL,
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginStart());
      api
        .post("/auth/login", {
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", JSON.stringify(res.data.token));
          dispatch(loginSuccess(res.data.data));
          toast.success(res.data.message);
          if (res.data.message === "Login Successful ✅") {
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.response?.data?.message || err.message);
          dispatch(loginFailure());
        });
    } else {
      toast.error("Please fill all the fields 📝");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };


  return (
    <>
         <AreaTop />
      <div className="login">
      <form className="loginform" onSubmit={handleClick}>
          <Typography variant="h4" component="h2" className="title">Login</Typography>
          <div className="loginInputs">
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Link to="/signup" className="signupLink">
            Don't have an account?
          </Link>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className="loginBtn"
          >
            Login
          </Button>
        </form>
        <ToastContainer />
      </div>

    
    </>
  );
};

export default Login;
