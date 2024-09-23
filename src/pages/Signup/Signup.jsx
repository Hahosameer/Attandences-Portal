import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import { useDispatch } from "react-redux";
import {
  signupFailure,
  signupStart,
  signupSuccess,
} from "../../Redux/Slices/SignupUserSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Link } from "react-router-dom";
import { TextField, IconButton, InputAdornment, MenuItem } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";
import "./signup.scss";
import { MdOutlineClose } from "react-icons/md";

const Signup = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: URL,
  });

  if (user) {
    return navigate("/");
  }

  const signup = async (e) => {
    e.preventDefault();
    if (email && password) {
      if (password.length < 7) {
        toast.error("Password must be at least 7 characters 🔒");
        return;
      }

      const data = {
        email,
        password,
        role,
      };

      dispatch(signupStart());

      await api
        .post("/auth/signup", data)
        .then((res) => {
          dispatch(signupSuccess(res.data));
          toast.success(res.data.message);

          if (res.data.message === "User Registration Successful") {
            navigate("/otp");
          }
        })
        .catch((err) => {
          dispatch(signupFailure());
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("Please fill all the fields 📝");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="auth-container">
      <div className="view-student-header">
        <h2>Signup</h2>
        <button className="close-btn">
          <Link to="/" className="view-student-link">
            <MdOutlineClose className="close" size={24} />
          </Link>
        </button>
      </div>
      <div className="auth-card">
        <h2>Signup</h2>
        <form onSubmit={signup}>
          <div className="form-group">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!email} // Turns red if empty
              helperText={!email && "Email is required"}
            />
          </div>

          <div className="form-group">
            <TextField
              label="Role"
              variant="outlined"
              select
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </div>

          <div className="form-group">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!password} // Turns red if empty
              helperText={!password && "Password is required"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <button type="submit" className="auth-button">
            Signup
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
