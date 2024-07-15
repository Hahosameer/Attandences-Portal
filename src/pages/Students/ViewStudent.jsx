import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { MdOutlineClose } from "react-icons/md";
// import "./ViewStudent.css"; // Add your CSS styles here

const ViewStudent = ({ student }) => {
  // Sample student data
  const sampleStudent = {
    name: "John Doe",
    age: 25,
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    course: "Web Development",
    batch: "Batch A",
    slot: "Morning Slot",
    profilePicture: "https://example.com/profile.jpg", // Replace with actual URL or local image path
  };

  // Use sampleStudent if student prop is not provided
  student = student || sampleStudent;

  return (
    <div className="view-student-container">
      <div className="view-student-header">
        <h2>Student Profile</h2>
        <button className="close-btn">
        <Link to="/" className="view-student-link">
          <MdOutlineClose className="close" size={24} />
        </Link>
        </button>
      </div>
      <div className="view-student-body">
        <div className="profile-picture">
          <img src="/public/user.webp" alt="" />
        </div>
        <div className="student-details">
          <div className="detail-item">
            <label>Name:</label>
            <span>{student.name}</span>
          </div>
          <div className="detail-item">
            <label>Age:</label>
            <span>{student.age}</span>
          </div>
          <div className="detail-item">
            <label>Email:</label>
            <span>{student.email}</span>
          </div>
          <div className="detail-item">
            <label>Phone Number:</label>
            <span>{student.phoneNumber}</span>
          </div>
          <div className="detail-item">
            <label>Course:</label>
            <span>{student.course}</span>
          </div>
          <div className="detail-item">
            <label>Batch:</label>
            <span>{student.batch}</span>
          </div>
          <div className="detail-item">
            <label>Slot:</label>
            <span>{student.slot}</span>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default ViewStudent;
