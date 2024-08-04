import React, { useState } from "react";
<<<<<<< HEAD
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { URL } from "../../Utils/url.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 768px)": {
    width: "90%",
    borderRadius: 0,
  },
};
=======
import axios from "axios";
import { URL } from "../../Utils/url";
import { toast, ToastContainer } from "react-toastify";
import { Modal, Box, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import "./courses.scss";
>>>>>>> 9d4a4cd4aecc508320bd07c1773b09b611b90014

const api = axios.create({
  baseURL: URL,
});

<<<<<<< HEAD
function CoursesModal({ open, handleClose, dataItem }) {
  console.log(dataItem);
  const [courseName, setCourseName] = useState(dataItem.CourseName);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updateCourse = {
        courseName,
      };
      console.log(updateCourse);
      const res = await api.put("/course/update/" + dataItem._id, updateCourse);
      console.log(res.data);
=======
const initialCourses = [
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

const CoursesModal = ({ open, handleClose }) => {
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState(initialCourses);
  const [loading, setLoading] = useState(false);

  const handleAddCourse = async () => {
    setLoading(true);
    const courseAdd = {
      courseName,
    };

    try {
      const res = await api.post("/course/add", courseAdd);
      console.log(res);
      toast.success(res.data.message);
      setCourses([...courses, courseName]);
      setCourseName("");
      setLoading(false);
>>>>>>> 9d4a4cd4aecc508320bd07c1773b09b611b90014
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
<<<<<<< HEAD
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="new-course-modal-title"
      aria-describedby="new-course-modal-description"
    >
      <Box sx={style}>
        <h2 id="new-course-modal-title" style={{ textAlign: "center" }}>
          UPDATE COURSE
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            margin="normal"
            id="courseName"
            label="Course Name"
            variant="outlined"
            onChange={(e) => setCourseName(e.target.value)}
            value={courseName}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
=======
      toast.error("Error adding course");
      setLoading(false);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    borderRadius: '20px',
    boxShadow: 24,
    overflowY: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    pt: 2,
    px: 4,
    pb: 3,
    "&::-webkit-scrollbar": {
      display: "none"
    },
    "@media (max-width: 768px)": {
      width: "100%",
      borderRadius: 0,
    },
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="courses-container">
            <div className="courses-wrapper">
              {loading ? (
                <div className="loader-container">
                  <p>Loading...</p>
                  {/* <img src="/public/loader.gif" alt="Loading..." /> */}
                </div>
              ) : (
                <>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="course-label">Course</InputLabel>
                    <Select
                      labelId="course-label"
                      id="course"
                      label="Course"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    >
                      {courses.map((course, index) => (
                        <MenuItem key={index} value={course}>
                          {course}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    onClick={handleAddCourse}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Add Course
                  </Button>
                </>
              )}
            </div>
            <ToastContainer />
          </div>
        </Box>
      </Modal>
    </>
  );
};
>>>>>>> 9d4a4cd4aecc508320bd07c1773b09b611b90014

export default CoursesModal;
