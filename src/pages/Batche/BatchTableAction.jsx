import { useEffect, useRef, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import BatchModal from "./BatxhModal";
const SlotsTableAction = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
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
        <BatchModal open={showEditModal} handleClose={handleCloseEditModal} />
      )}
    </>
  );
};

export default SlotsTableAction;
