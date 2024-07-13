import React, { useState } from "react";
import BatchTableAction from "./BatchTableAction";
import "./AreaTable.scss";
import { AreaTop } from "../../components";

const TABLE_HEADS = ["S-NO", "Course", "Started From","EndTime", "Action"];

const TABLE_DATA = [
  { course: "Web Development", order_id: 1, Name: "Sufiyan", Teacher: "Afaq Karim", StartTime: "12/7/20024",EndTime: "12/7/20024" },
  { course: "Web Development", order_id: 2, Name: "Sufiyan", Teacher: "Afaq Karim", StartTime: "12/7/20024",EndTime: "12/7/20024" },
  { course: "Web Development", order_id: 3, Name: "Sufiyan", Teacher: "Afaq Karim", StartTime: "12/7/20024",EndTime: "12/7/20024" },
  { course: "Web Development", order_id: 4, Name: "Sufiyan", Teacher: "Afaq Karim", StartTime: "12/7/20024",EndTime: "12/7/20024" },
  { course: "Web Development", order_id: 5, Name: "Sufiyan", Teacher: "Afaq Karim", StartTime: "12/7/20024",EndTime: "12/7/20024" },
  { course: "Web Development", order_id: 6, Name: "Sufiyan", Teacher: "Afaq Karim", StartTime: "12/7/20024",EndTime: "12/7/20024" },
  { course: "Web Development", order_id: 7, Name: "Sufiyan", Teacher: "Afaq Karim", StartTime: "12/7/20024",EndTime: "12/7/20024" },
];

const BatchList = () => {
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
    <>
      <AreaTop />
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">
            <input
              type="text"
              placeholder="Search Data"
              value={searchTerm}
              onChange={handleSearch}
            />
          </h4>
        </div>
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                {TABLE_HEADS?.map((th, index) => (
                  <th key={index} onClick={() => handleSort(th.toLowerCase().replace(" ", "_"))}>
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((dataItem, index) => (
                <tr key={index}>
                  <td>{dataItem.order_id}</td>
                  <td>{dataItem.course}</td>
                <td>
                <div className="dt-status">
                      <span className="dt-status-text">{dataItem.StartTime}</span>
                    </div>
                </td>
                  <td>
                   
                    <div className="dt-status">
                      <span className="dt-status-text">{dataItem.EndTime}</span>
                    </div>
                  </td>
                  <td className="dt-cell-action">
                    <BatchTableAction />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default BatchList;
