import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Select, InputLabel, FormControl, Input, CircularProgress } from "@mui/material";
import { URL } from "../../Utils/url.js";
import axios from "axios";
import useUploadImage from "../../Custom Hooks/useUploadImage.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  height: "80vh",
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  overflowY: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  pt: 2,
  px: 4,
  pb: 3,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "@media (max-width: 768px)": {
    width: "100%",
    borderRadius: 0,
  },
};

const api = axios.create({
  baseURL: URL,
});

function NewStudentModal({ open, handleClose }) {
  const [profilePicture, setProfilePicture] = useState(""); 
  const [isUploading, setIsUploading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [courseName, setCourseName] = useState("");
  const [slotId, setSlotId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [fetchcourse, setFetchCourse] = useState([]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await useUploadImage(file);
      setProfilePicture(url); 
      setIsUploading(false);
    } catch (error) {
      alert("Image upload fail ho gayi. Console check karein.");
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!profilePicture) {
      alert("Pehle image upload hone dein!");
      return;
    }

    try {
      const studentobj = {
        fullName,
        email,
        fatherEmail,
        phoneNumber,
        batchNumber,
        courseName,
        slotId: slotId,
        rollNumber,
        profilePicture: profilePicture,
      };

      const res = await api.post("/student/add", studentobj);
      console.log("Student Added:", res.data);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log("Error details:", error.response?.data);
      alert(error.response?.data?.message || "Student add nahi ho saka!");
    }
  };

  const getAllCourses = async () => {
    try {
      const res = await api.get("/course");
      setFetchCourse(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">NEW STUDENT</h2>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Full Name" onChange={(e) => setFullName(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Father Email" type="email" onChange={(e) => setFatherEmail(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Phone Number" type="number" onChange={(e) => setPhoneNumber(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Batch Number" type="number" onChange={(e) => setBatchNumber(e.target.value)} required />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Course</InputLabel>
            <Select defaultValue="" label="Course" onChange={(e) => setCourseName(e.target.value)} required>
              {fetchcourse.map((course) => (
                <MenuItem key={course._id} value={course.CourseName}>
                  {course.CourseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField fullWidth margin="normal" label="Slot ID" onChange={(e) => setSlotId(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Roll Number" type="number" onChange={(e) => setRollNumber(e.target.value)} required />

          <FormControl fullWidth margin="normal">
            <Input id="profile-pic" type="file" inputProps={{ accept: "image/*" }} style={{ display: "none" }} onChange={handleImageChange} />
            <label htmlFor="profile-pic">
              <Button component="span" variant="outlined" fullWidth disabled={isUploading}>
                {isUploading ? <CircularProgress size={24} /> : "Upload Profile Picture"}
              </Button>
            </label>
            {profilePicture && <p style={{ color: "green", fontSize: "12px" }}>Image Ready ✅</p>}
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isUploading}>
              {isUploading ? "Please Wait..." : "Add Student"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default NewStudentModal;