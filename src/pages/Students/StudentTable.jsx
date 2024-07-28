import StudentTableAction from "./StudentTableAction";
import "./Student.scss";
// import { AreaTop } from "../../components";
import { useState } from "react";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";

const TABLE_HEADS = [
  "Name",
  "Course",
  "Email",
  "Batch",
  "Action",
];

const TABLE_DATA = [
  {

    course: "Web Development",
    
    Name: "SAMAD",
    Teacher: "Afaq Karim",
    Batch: "10",
    Email: "Haroon@gmail.com"
  },
  {

    course: "Web Development",
    
    Name: "HAROON",
    Teacher: "Afaq Karim",
    Batch: "10",
    Email: "sameer@gmail.com"
  },
  {

    course: "Web Development",
    
    Name: "SAMIR",
    Teacher: "Afaq Karim",
    Batch: "10",
    Email: "haris@gmail.com"
  },
  {

    course: "Web Development",
    
    Name: "SHAHZAD",
    Teacher: "Afaq Karim",
    Batch: "10",
    Email: "waqas@gmail.com"
  },
  {

    course: "Web Development",
    
    Name: "TOFEEE",
    Teacher: "Afaq Karim",
    Batch: "10",
    Email: "hadi@gmail.com"
  },
  {

    course: "Web Development",
    
    Name: "MARYAM",
    Teacher: "Afaq Karim",
    Batch: "10",
    Email: "sufiyan@gmail.com"
  },
  {

    course: "Web Development",
    
    Name: "AFSHEEN",
    Teacher: "Afaq Karim",
    Batch: "10",
    Email: "sami@gmail.com"
  },


];

const StudentList = () => {
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
            {filteredData?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                
                  <td>{dataItem.Name}</td>
                  <td>{dataItem.course}</td>
                  <td>{dataItem.Email}</td>
               
                  <td>
                    <div className="dt-status">
                      <span
                        // className={`dt-status-dot dot-${dataItem.Batch}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.Batch}</span>
                    </div>
                  </td>
               
                  <td className="dt-cell-action">
                    <StudentTableAction />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
    </>
  );
};

export default StudentList;
