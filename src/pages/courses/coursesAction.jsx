import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { URL } from "../../Utils/url.js";
import CoursesModal from "./Coursemodal.jsx";

const api = axios.create({
  baseURL: URL,
});

const CourseTableAction = ({ dataItem }) => {
=======
import EditCoursesModal from "./EditCoursemoda";

const CourseTableAction = ({ course }) => {
>>>>>>> 9d4a4cd4aecc508320bd07c1773b09b611b90014
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOpenEditModal = () => {
    setSelectedCourse(course);
    setShowEditModal(true);
    setShowDropdown(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCourse(null);
  };

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const HandleDelete = async () => {
    try {
      await api.delete(`/course/delete/${dataItem._id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="action-dropdown-btn"
        onClick={handleDropdown}
      >
        <HiDotsHorizontal size={18} />
        {showDropdown && (
          <div className="action-dropdown-menu" ref={dropdownRef}>
            <ul className="dropdown-menu-list">
              <li className="dropdown-menu-item" onClick={handleOpenEditModal}>
                Edit
              </li>
              <li className="dropdown-menu-item">
                <Link className="dropdown-menu-link" onClick={HandleDelete}>
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        )}
      </button>
      {showEditModal && (
<<<<<<< HEAD
        <CoursesModal
          open={showEditModal}
          handleClose={handleCloseEditModal}
          dataItem={dataItem}
=======
        <EditCoursesModal
          open={showEditModal}
          handleClose={handleCloseEditModal}
          course={selectedCourse}
>>>>>>> 9d4a4cd4aecc508320bd07c1773b09b611b90014
        />
      )}
    </>
  );
};

export default CourseTableAction;
