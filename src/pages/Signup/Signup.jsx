import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";
import { URL } from "../../Utils/url.js";
import { useDispatch } from "react-redux";
import {
  signupFailure,
  signupStart,
  signupSuccess,
} from "../../Redux/Slices/SignupUserSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Container, Typography, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AreaTop from "../../components/dashboard/areaTop/AreaTop.jsx";
// import { AreaTop } from "../../components/index.js";

const Signup = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const api = axios.create({
    baseURL: URL,
  });
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password) {
      if (password.length < 7) {
        toast.error("Password must be at least 7 characters 🔒");
        return;
      }
      // create user obj
      const data = {
        firstName,
        lastName,
        email,
        password,
      };

      // signup start
      dispatch(signupStart());

      // hit an api
      await api
        .post("/auth/signup", data)
        .then((res) => {
          // checking response
          console.log(res.data);

          // signup success
          dispatch(signupSuccess(res.data));

          // set message
          toast.success(res.data.message);

          // navigate to otp
          if (res.data.message === "User Registration Successful") {
            navigate("/otp");
          }
        })
        .catch((err) => {
          dispatch(signupFailure());
          toast.error(err.response.data.message);
          console.log(err);
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
      <div className="signup">
        <form className="signupform" onSubmit={signup}>
          <Typography variant="h4" component="h2" gutterBottom className="title">Signup</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Signup
          </Button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
