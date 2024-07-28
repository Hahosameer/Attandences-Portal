import React, { useState } from "react";
import axios from "axios";
import { URL } from "../../Utils/url";
import { toast, ToastContainer } from "react-toastify";
import { Modal, Box, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import "./courses.scss";

const api = axios.create({
  baseURL: URL,
});

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
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
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

export default CoursesModal;
