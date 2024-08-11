import { useEffect, useState } from "react";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";
import { URL } from "../../Utils/url";
import axios from "axios";
import "./Viewattendence.css";


const TABLE_HEADS = [
  "Roll Number",
  "Slot Id",
  "Date",
  "Status",
  "Timing",
  "Days",
];

const api = axios.create({
  baseURL: URL,
});

const SlotsList = () => {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    console.log(selectedSlot);
  }, [selectedSlot]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await api.get("/course"); // Fetch courses data
      console.log(response.data.data);
      setCourses(response.data.data);
    };

    const fetchBatches = async () => {
      if (selectedCourse) {
        console.log(selectedCourse);
        const response = await api.get(`/batch?coursename=${selectedCourse}`);
        console.log(response.data.data);
        setBatches(response.data.data);
      }
    };

    const fetchSlots = async () => {
      if (selectedBatch) {
        const response = await api.get(
          `/slot?batchnumber=${selectedBatch}&coursename=${selectedCourse}`
        );

        console.log(response.data.data);
        setSlots(response.data.data);
      }
    };

    fetchCourses();
    fetchBatches();
    fetchSlots();
  }, [selectedCourse, selectedBatch]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (selectedSlot) {
          const response = await api.get(
            `/attendance/view?slotId=${selectedSlot}`
          );
          console.log(response.data);
          setData(response.data.attendance);
        } else {
          const response = await api.get(`/attendance/view`);
          console.log(response.data.attendance);
          setData(response.data.attendance);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [selectedSlot]);

  return (
    <>
      <AreaTop />
      <section className="content-area-table">
        <div className="dropdown-container">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course.CourseName}>
                {course.CourseName}
              </option>
            ))}
          </select>

          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            disabled={!selectedCourse}
          >
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch.BatchNumber}>
                {batch.BatchNumber}
              </option>
            ))}
          </select>

          <select
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            disabled={!selectedBatch}
          >
            <option value="">Select Slot</option>
            {slots?.map((slot) => (
              <option key={slot._id} value={slot.SlotId}>
                {slot.Days.map((day) => {
                  return day.charAt(0).toUpperCase() + day.slice(1);
                }).join(", ")}{" "}
                {slot.StartTime}-{slot.EndTime}
              </option>
            ))}
          </select>


        </div>

        <div className="data-table-info">
          <h4 className="data-table-title"></h4>
        </div>
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                {TABLE_HEADS.map((th, index) => (
                  <th key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item?.RollNumber}</td>
                  <td>{item?.SlotId}</td>
                  <td>{item?.createdAt.slice(0, 10)}</td>
                  <td>{item?.Status}</td>
                  <td>
                    {item?.slotDetails.StartTime +
                      " - " +
                      item?.slotDetails.EndTime}
                  </td>
                  <td align="center">{item?.slotDetails.Days.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default SlotsList;
