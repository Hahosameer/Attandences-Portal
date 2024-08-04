import "./courses.scss";
import { useEffect, useState } from "react";
import AreaTop from "../../components/dashboard/areaTop/AreaTop";
import axios from "axios";
import { URL } from "../../Utils/url";
<<<<<<< HEAD
const TABLE_HEADS = ["Course", "Action"];
import CourseTableAction from "./coursesAction";
=======
const TABLE_HEADS = ["Course","" , "Action"];
import  CourseTableAction from "./coursesAction";

>>>>>>> 9d4a4cd4aecc508320bd07c1773b09b611b90014

const api = axios.create({
  baseURL: URL,
});

const CourseList = () => {
  const [course, setCourse] = useState([]);

  const getCourse = async () => {
    try {
      const res = await api.get("/course");
      console.log(res.data.data);
      setCourse(res.data.data);
      console.log(res.data , "data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <AreaTop />
      <section className="content-area-table">
        <div className="data-table-info">
          <h4 className="data-table-title">
            <input type="text" placeholder="Search Data" />
          </h4>
        </div>
        <div className="data-table-diagram">
          <table>
            <thead>
              <tr>
                {TABLE_HEADS?.map((th, index) => (
                  <th
                    key={index}
                    onClick={() =>
                      handleSort(th.toLowerCase().replace(" ", "_"))
                    }
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {course?.reverse().map((dataItem) => {
                return (
                  <tr key={dataItem.id}>
                    <td>{dataItem.CourseName}</td>
<<<<<<< HEAD
=======
                    
                    <td>
                      <div className="dt-status">
                        <span
                        // className={`dt-status-dot dot-${dataItem.Batches}`}
                        ></span>
                      </div>
                    </td>
>>>>>>> 9d4a4cd4aecc508320bd07c1773b09b611b90014
                    <td className="dt-cell-action">
                      <CourseTableAction  dataItem={dataItem}/>
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

export default CourseList;
