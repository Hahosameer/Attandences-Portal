import React, { useState } from "react";
import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const TABLE_HEADS = ["ID", "Name", "Course", "Present", "Absent", "Total"];

const TABLE_DATA = [
  {
    course: "Web Development",
    order_id: 11232,
    Name: "Haroon",
    Teacher: "4",
    Batch: "10",
    Time: "p",
  },
  {
    course: "Web Development",
    order_id: 11233,
    Name: "Ali",
    Teacher: "4",
    Batch: "10",
    Time: "p",
  },
  {
    course: "Web Development",
    order_id: 11234,
    Name: "Ahmed",
    Teacher: "4",
    Batch: "11",
    Time: "p",
  },
  {
    course: "Web Development",
    order_id: 11235,
    Name: "Sara",
    Teacher: "4",
    Batch: "12",
    Time: "p",
  },
];

const AreaTable = () => {
  const [data, setData] = useState(TABLE_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
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

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">
          {/* <input
            type="text"
            placeholder="Search Data"
            value={searchTerm}
            onChange={handleSearch}
          /> */}
          Top Student Perfomercnce
        </h4>
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
            {filteredData.map((dataItem, index) => (
              <tr key={index}>
                <td>{dataItem.order_id}</td>
                <td>{dataItem.Name}</td>
                <td>{dataItem.course}</td>
                <td>{dataItem.Time}</td>
                <td>{dataItem.Teacher}</td>
                <td>
                  <div className="dt-status">
                    <span className="dt-status-text">{dataItem.Batch}</span>
                  </div>
                </td>
                {/* <td className="dt-cell-action">
                  <AreaTableAction />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
