import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Select, InputLabel, FormControl } from '@mui/material';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  height: "80vh",
  bgcolor: "background.paper",
  borderRadius: '20px',
  // border: "2px solid #000",
  boxShadow: 24,
  overflowY: "scroll",
  scrollbarWidth: "none", // For Firefox
  msOverflowStyle: "none", // For Internet Explorer and Edge
  pt: 2,
  px: 4,
  pb: 3,
  "&::-webkit-scrollbar": {
    display: "none" // For Chrome, Safari, and Opera
  },
  "@media (max-width: 768px)": {
    width: "100%",
    borderRadius: 0,
  },
};


const courses = [
  'Web Development',
  'Graphic Designing',
  'Digital Marketing',
  'AutoCAD',
  'Mobile App Development',
  'English Language',
  'Chinese Language',
  'Networking',
  'Database Management',
  'CCNA',
  'Microsoft Office',
  'Project Management',
  'Artificial Intelligence',
  'Machine Learning',
  'Blockchain Technology',
  'Game Development',
  'UI/UX Design',
  'Video Editing',
  'Photography',
  'Animation',
  'Robotics',
  'Data Science',
  'Cyber Security',
  'Internet of Things (IoT)',
  'Virtual Reality (VR)',
  'Augmented Reality (AR)',
  'Cloud Computing',
  '3D Printing',
  'E-commerce',
  'Financial Management',
  'Accounting Software',
  'Entrepreneurship',
  'Fashion Designing',
  'Interior Designing',
  'Culinary Arts',
  'Film Making',
  'Music Production'
];

// const campuses = ['Gulshan', 'Bahadurabad', 'Malir'];
const slots = [
  { day: 'Monday Wednesday Friday', time: '6:00 AM - 9:00 AM' },
  { day: 'Monday Wednesday Friday', time: '2:00 PM - 4:00 PM' },
  { day: 'Monday Wednesday Friday', time: '8:00 AM - 10:00 AM' }
];

function SlotsModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">EDIT STUDENT</h2>
        <form>
          <TextField
            fullWidth
            margin="normal"
            id="fullName"
            label="Teacher Name"
            variant="outlined"
          />

     
      

          <TextField
            fullWidth
            margin="normal"
            id="batch"
            label="Batch"
            type="number"
            variant="outlined"
          />


          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="course"
              label="Course"
              defaultValue=""
            >
              {courses.map((course, index) => (
                <MenuItem key={index} value={course}>
                  {course}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl fullWidth margin="normal">
            <InputLabel id="slot-label">Slot</InputLabel>
            <Select
              labelId="slot-label"
              id="slot"
              label="Slot"
              defaultValue=""
            >
              {slots.map((slot, index) => (
                <MenuItem key={index} value={`${slot.day} ${slot.time}`}>
                  {`${slot.day} ${slot.time}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Updated
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default SlotsModal;
