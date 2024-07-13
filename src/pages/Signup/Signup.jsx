import { TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signupFailure, signupStart, signupSuccess } from '../../Redux/Slices/SignupUserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AreaTop } from '../../components';

const Signup = () => {
  const dispatch = useDispatch();
  const theme = useTheme(); // Access theme object
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const api = axios.create({ baseURL: URL });
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password) {
      if (password.length < 7) {
        toast.error('Password must be at least 7 characters 🔒');
        return;
      }

      const data = { firstName, lastName, email, password };

      dispatch(signupStart());

      try {
        const res = await api.post('/auth/signup', data);
        console.log(res.data);
        dispatch(signupSuccess(res.data));
        toast.success(res.data.message);

        if (res.data.message === 'User Registration Successful') {
          navigate('/otp');
        }
      } catch (err) {
        dispatch(signupFailure());
        toast.error(err.response.data.message);
        console.error(err);
      }
    } else {
      toast.error('Please fill all the fields 📝');
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
          <Typography variant="h4" component="h2" gutterBottom className="title" style={{ color: theme.palette.text.primary }}>
            Signup
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            InputLabelProps={{
              style: { color: theme.palette.text.primary }, // Adjust text color
            }}
            InputProps={{
              style: { color: theme.palette.text.primary }, // Adjust input text color
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            InputLabelProps={{
              style: { color: theme.palette.text.primary }, // Adjust text color
            }}
            InputProps={{
              style: { color: theme.palette.text.primary }, // Adjust input text color
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              style: { color: theme.palette.text.primary }, // Adjust text color
            }}
            InputProps={{
              style: { color: theme.palette.text.primary }, // Adjust input text color
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: theme.palette.text.primary }, // Adjust text color
            }}
            InputProps={{
              style: { color: theme.palette.text.primary }, // Adjust input text color
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Signup
          </Button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
