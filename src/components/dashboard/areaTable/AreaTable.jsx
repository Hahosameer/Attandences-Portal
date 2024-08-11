import React, { useEffect, useState } from "react";
import "./AreaTable.css";
import axios from "axios";
import { URL } from "../../../Utils/url";

const TABLE_HEADS = [
  "Roll Number",
  "Name",
  "Course",
  "Present",
  "Absent",
  "Total Days",
  "Percent",
];

const api = axios.create({
  baseURL: URL,
});

const AreaTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data
    .filter((item) => {
      const totalDays = item.TotalDays || 1; // Avoid division by zero
      const presentDays = item.PresentDays || 0;
      const attendancePercentage = (presentDays / totalDays) * 100;
      return attendancePercentage >= 80;
    })
    .filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/student");
        if (Array.isArray(res.data.data)) {
          console.log(res.data.data);
          setData(res.data.data);
        } else {
          console.error("Expected an array but got:", res.data);
          setData([]);
        }
      } catch (err) {
        console.log(err);
        setData([]); // Set to an empty array in case of error
      }
    };

    fetchStudents();
  }, []);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Top Student Performance</h4>
        <input
          className="data-table-input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index} onClick={() => handleSort(th.toLowerCase())}>
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((dataItem, index) => {
              const totalDays = dataItem.TotalDays || 1; // Avoid division by zero
              const presentDays = dataItem.PresentDays || 0;
              const attendancePercentage = (presentDays / totalDays) * 100;

              return (
                <tr key={index}>
                  <td>{dataItem.RollNumber}</td>
                  <td>{dataItem.FullName}</td>
                  <td>{dataItem.CourseName}</td>
                  <td>{dataItem.PresentDays}</td>
                  <td>{dataItem.AbsentDays}</td>
                  <td>{dataItem.TotalDays}</td>
                  <td>
                    {attendancePercentage >= 80 && (
                      <span className="high-performance">{attendancePercentage}%</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
