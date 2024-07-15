import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";// Import the StudentProfileView component
import ChildModal from "./StudentModal"; // Import the ChildModal component

const StudentTableAction = ({ student }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
    setShowDropdown(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const dropdownRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <li className="dropdown-menu-item">
              <Link to="/StudentProfile" className="dropdown-menu-link">
              View
              </Link>
              </li>
              <li className="dropdown-menu-item" onClick={handleOpenEditModal}>
                Edit
              </li>
              <li className="dropdown-menu-item">
                <Link to="/view" className="dropdown-menu-link">
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        )}
      </button>

      {showEditModal && (
        <ChildModal open={showEditModal} handleClose={handleCloseEditModal} />
      )}
    </>
  );
};

export default StudentTableAction;
