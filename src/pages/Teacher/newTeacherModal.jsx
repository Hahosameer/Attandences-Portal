import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Select, InputLabel, FormControl, Input, CircularProgress } from "@mui/material"; // CircularProgress add kiya
import { URL } from "../../Utils/url";
import axios from "axios";
import useUploadImage from "../../Custom Hooks/useUploadImage.jsx"; // Hook import kiya

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

function NewTeacherModal({ open, handleClose }) {
  const [profilePicture, setProfilePicture] = useState(""); // Image URL ke liye
  const [isUploading, setIsUploading] = useState(false); // Loading state
  const [Courses, setCourses] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [teacherOf, setTeacherOf] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await useUploadImage(file); // Cloudinary pe upload
      setProfilePicture(url); // URL set kar di
      setIsUploading(false);
      console.log("Teacher Image URL:", url);
    } catch (error) {
      alert("Teacher image upload fail!");
      setIsUploading(false);
    }
  };

  const HandleAddTeacher = async (event) => {
    event.preventDefault(); // Form reload hone se rokne ke liye

    if (!profilePicture) {
      alert("Pehle profile picture upload hone dein!");
      return;
    }

    const TeacherObj = {
      teacherName,
      email,
      phoneNumber,
      teacherOf,
      teacherId,
      profilePicture, // Ab ye Cloudinary ka URL bhejega
    };

    try {
      const res = await api.post("/teacher/add", TeacherObj);
      console.log(res.data);
      alert("Teacher Added Successfully ✅");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  const getCourses = async () => {
    try {
      const res = await api.get("/course");
      setCourses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, width: 500 }}>
        <h2 id="child-modal-title">NEW TEACHER</h2>

        <form onSubmit={HandleAddTeacher}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            variant="outlined"
            onChange={(e) => setTeacherName(e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            type="tel"
            variant="outlined"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Teacher ID"
            variant="outlined"
            onChange={(e) => setTeacherId(e.target.value)}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              label="Course"
              defaultValue=""
              onChange={(e) => setTeacherOf(e.target.value)}
              required
            >
              {Courses.map((course, index) => (
                <MenuItem key={index} value={course.CourseName}>
                  {course.CourseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Image Upload Field */}
          <FormControl fullWidth margin="normal">
            <Input
              id="teacher-pic"
              type="file"
              inputProps={{ accept: "image/*" }}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="teacher-pic">
              <Button
                component="span"
                variant="outlined"
                fullWidth
                disabled={isUploading}
              >
                {isUploading ? <CircularProgress size={24} /> : "Upload Teacher Photo"}
              </Button>
            </label>
            {profilePicture && (
              <p style={{ color: "green", fontSize: "12px", marginTop: "5px" }}>
                Image Uploaded ✅
              </p>
            )}
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Add Teacher"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default NewTeacherModal;