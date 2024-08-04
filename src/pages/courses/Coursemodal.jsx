import React, { useState } from "react";
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

const api = axios.create({
  baseURL: URL,
});

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
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
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

export default CoursesModal;
