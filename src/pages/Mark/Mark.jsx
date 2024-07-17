import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {
  TextField, Button, Container, Typography, Box,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Card, CardContent, CardHeader, Avatar, LinearProgress
} from '@mui/material';

// Simulated backend response functionn
const getUsernameById = (id) => {
  const userDatabase = {
    123: 'John Doe',
    456: 'Jane Smith',
    789: 'Alice Johnson',
  };
  return userDatabase[id] || null;
};

const Mark = () => {
  const [id, setId] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [open, setOpen] = useState(false);

  const handleAttendance = () => {
    if (id && !isNaN(id)) {
      const user = getUsernameById(id);
      if (user) {
        setUsername(user);
        setSuccess(true);
        setError(false);
        setOpen(true);
        
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } else {
        setSuccess(false);
        setError(true);
      }
    } else {
      setSuccess(false);
      setError(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 8, bgcolor: 'background.paper' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error: Please enter a valid numeric ID to mark attendance.
          </Alert>
        )}
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Mark Attendance
        </Typography>
        <TextField
          label="ID"
          variant="outlined"
          fullWidth
          value={id}
          onChange={(e) => setId(e.target.value)}
          margin="normal"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAttendance}
          sx={{ textTransform: 'none', mb: 2 }}
        >
          Mark Attendance
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Attendance Marked Successfully</DialogTitle>
        <DialogContent>
          <Card sx={{ mb: 2 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'green' }}>
                  <CheckIcon />
                </Avatar>
              }
              title={id}
              subheader={username}
              titleTypographyProps={{ variant: 'h6' }}
              subheaderTypographyProps={{ variant: 'subtitle1' }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {username}
              </Typography>
            </CardContent>
          </Card>
          <LinearProgress sx={{ bgcolor: 'green', height: 4 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Mark;