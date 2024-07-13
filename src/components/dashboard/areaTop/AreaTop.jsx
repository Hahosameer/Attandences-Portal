import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import { Link } from "react-router-dom";

const AreaTop = () => {
  const { openSidebar } = useContext(SidebarContext);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return (
    <section className="content-area-top">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
     
      </div>
      <div className="area-top-r">
       <Link to="/signup" >
      <button>Signup</button>
       </Link>
       <Link to="/login" >

      <button>Login</button>
       </Link>
     
       <Link to="/Otp" >

      <button>Otp</button>
       </Link>
     

       
      </div>
    </section>
  );
};

export default AreaTop;
