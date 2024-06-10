import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from 'axios';

const Registration = () => {
  const [name, setName] = useState("");
  const [studentid, setStudentid] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("bca"); 

  const register = () => {
    console.log(name, studentid, semester, department);
    axios.post('http://localhost:4000/registerStudent',{
      "id":studentid,
      "name":name,
      "department":department,
      "sem":semester,
      "totalAttendance":0
    }).then((res) => {
      console.log(res)
    }).catch((err) => console.log(err))
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e);
  };

  return (
    <div>
      <video width="600" height="400" id="myVideo" loop>
        <source src="lines.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div>
        <section>
          <form>
            <h1>Registration Form</h1>
            <div className="inputbox">
              <ion-icon name="person-outline"></ion-icon>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                id="nameInput"
                required
              />
              <label htmlFor="nameInput">Name</label>
            </div>
            <div className="inputbox">
              <ion-icon name="person-outline"></ion-icon>
              <input
                type="text"
                onChange={(e) => setStudentid(e.target.value)}
                id="studentId"
                pattern="\d{6}"
                title="Please enter a 6-digit student ID"
                required
              />
              <label htmlFor="studentId">Student ID</label>
            </div>
            <div className="inputbox">
              <ion-icon name="calculator-outline"></ion-icon>
              <input
                type="number"
                onChange={(e) => setSemester(e.target.value)}
                id="semesterInput"
                required
              />
              <label htmlFor="semesterInput">Semester</label>
            </div>
            <div className="inputbox">
              <ion-icon name="person-outline"></ion-icon>
              <select
                id="departmentInput"
                value={department}
                onChange={(e)=>handleDepartmentChange(e.target.value)}
                required
              >
                <option value="bca">BCA</option>
                <option value="bscit">BScIT</option>
                <option value="bcom">BCom</option>
              </select>
            </div>
            <button className="loginButton" onClick={()=>register()}>
              Register
            </button>
            <div id="message"></div>
            <div className="register">
              <p>
                Already have an account? <Link to="/">Login</Link>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Registration;
