import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useContext, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { Link, useLocation } from "react-router-dom";
import NewStudentModal from "../../../pages/Students/newStudentModal";
import NewTeacherModal from "../../../pages/Teacher/newTeacherModal";
import NewSlotsModal from "../../../pages/Slots/newSlotsModal";
import NewBatchModal from "../../../pages/Batche/newBatchtModal";
import { useSelector } from "react-redux";
import NewCourseModal from "../../../pages/courses/newCourseModal.jsx";

const AreaTop = ({ title }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [teacherEditModal, setTeacherEditModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [slotEditModal, setSlotEditModal] = useState(false);
  const [batchEditModal, setBatchEditModal] = useState(false);
  const [courseEditModal, setCourseEditModal] = useState(false);

  const handleOpenEditModalBatch = () => {
    setBatchEditModal(true);
  };

  const handleCloseEditModalBatch = () => {
    setBatchEditModal(false);
  };

  const handleOpenEditModalSlots = () => {
    setSlotEditModal(true);
  };

  const handleCloseEditModalSlots = () => {
    setSlotEditModal(false);
  };

  const handleOpenEditModalTea = () => {
    setTeacherEditModal(true);
  };

  const handleCloseEditModalTea = () => {
    setTeacherEditModal(false);
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleOpenCourseModal = () => {
    setCourseEditModal(true);
  };

  const handleCloseCourseModal = () => {
    setCourseEditModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const { openSidebar } = useContext(SidebarContext);
  const location = useLocation();

  const getPageName = (pathname) => {
    switch (pathname) {
      case "/signup":
        return "Signup";
      case "/login":
        return "Login";
      case "/otp":
        return "OTP Verification";
      case "/students":
        return "Students";
      case "/teachers":
        return "Teachers";
      case "/slots":
        return "Slots";
      case "/batches":
        return "Batches";
      case "/courses":
        return "Courses";
      case "/StudentPerfomence":
        return "Student Performance";
      case "/Viewattendence":
        return "View Attendance";
      default:
        return "Dashboard";
    }
  };

  const getButtons = (pathname) => {
    switch (pathname) {
      case "/":
      case "/signup":
      case "/login":
      case "/otp":
        return (
          <>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  const AddButton = (pathname) => {
    switch (pathname) {
      case "/students":
        return <button onClick={handleOpenEditModal}>Add New Student</button>;
      case "/teachers":
        return (
          <button onClick={handleOpenEditModalTea}>Add New Teacher</button>
        );
      case "/slots":
        return <button onClick={handleOpenEditModalSlots}>Add New Slot</button>;
      case "/batches":
        return (
          <button onClick={handleOpenEditModalBatch}>Add New Batch</button>
        );
      case "/StudentPerfomence":
        return (
          <Link to="/add-performance">
            <button>Add New Performance</button>
          </Link>
        );
      case "/Viewattendence":
        return (
          <Link>
            <button className="print-btn" onClick={handlePrint}>
              Print
            </button>
          </Link>
        );
      case "/courses":
        return <button onClick={handleOpenCourseModal}>Add New Course</button>;
      default:
        return null;
    }
  };

  return (
    <>
      <section className="content-area-top">
        <div className="area-top-l">
          <button
            className="sidebar-open-btn"
            type="button"
            onClick={openSidebar}
          >
            <MdOutlineMenu size={24} />
          </button>
          <h1>
            {getPageName(location.pathname) === "markAttendance" && title}
          </h1>
        </div>
        <div className="area-top-r">
          {!user ? getButtons(location.pathname) : null}
          {AddButton(location.pathname)}
        </div>
      </section>

      {teacherEditModal && (
        <NewTeacherModal
          open={teacherEditModal}
          handleClose={handleCloseEditModalTea}
        />
      )}
      {showEditModal && (
        <NewStudentModal
          open={showEditModal}
          handleClose={handleCloseEditModal}
        />
      )}
      {slotEditModal && (
        <NewSlotsModal
          open={slotEditModal}
          handleClose={handleCloseEditModalSlots}
        />
      )}
      {batchEditModal && (
        <NewBatchModal
          open={batchEditModal}
          handleClose={handleCloseEditModalBatch}
        />
      )}
      {courseEditModal && (
        <NewCourseModal
          open={courseEditModal}
          handleClose={handleCloseCourseModal}
        />
      )}
    </>
  );
};

export default AreaTop;
