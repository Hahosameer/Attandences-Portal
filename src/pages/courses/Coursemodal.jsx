import React, { useEffect, useState } from 'react'
import AreaTop from '../../components/dashboard/areaTop/AreaTop'
import "./courses.scss"
import axios from 'axios'
import { URL } from '../../Utils/url'
import { toast, ToastContainer } from 'react-toastify'



const api = axios.create({
  baseURL: URL,
})
const CoursesModal = () => {

const [courseName, setCourseName] = useState("")

const HandleAddCourse = async () => {

const courseAdd = {
  courseName
}

try {
  const res = await api.post("/course/add", courseAdd)
console.log(res)
toast.success(res.data.message)
setCourseName("")

} catch (error) {
  console.log(error)
}
}

  return (
    <>
        <AreaTop/>
        <div className="courses-container">
          <div className="courses-wrapper">
           <input type="text" name="" id="" placeholder='Add Course' onChange={(e) => setCourseName(e.target.value)}/>
           <button onClick={HandleAddCourse}>Add Course</button>
          </div>
          <ToastContainer />

        </div>

    </>
        
  )
}

export default CoursesModal