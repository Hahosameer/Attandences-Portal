import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import StudentList from "./pages/Students/StudentTable";
import TeacherList from "./pages/Teacher/TeacherTable";
import SlotsList from "./pages/Slots/SlotsTable";
import BatchList from "./pages/Batche/BatchTable";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Otp from "./pages/Otp/Otp.jsx";
import ViewStudent from "./pages/Students/ViewStudent.jsx";
import ViewTeacher from "./pages/Teacher/ViewTeacher.jsx";

// import BatchList from "./pages/Batche/BatchTable";
function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/slots" element={<SlotsList />} />
            <Route path="/batches" element={<BatchList />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Otp" element={<Otp />} />
            <Route path="/StudentProfile" element={<ViewStudent />} />
            <Route path="/TeacherProfile" element={<ViewTeacher />} />
           
           
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router>
    </>
  );
}

export default App;
