import React, { useEffect, useState } from "react";
import './home.css';
import axios from "axios";
import DateTheme from "./DateTheme";
const Homepage = () => {

  const [searchInput, setSearchInput] = useState("");
  const [selDate, setSelDate] = useState("01")
  const [student, setStudent] = useState([])
  const [dates, setDates] = useState([])
  const [alert, setAlert] = useState(false)
  const [yearDate, setYearDate] = useState("2023")

  useEffect(() => {
    if (!localStorage.getItem('id')) {
      localStorage.clear();
      window.location.assign('/')
    }
  }, [])

  const getDetail = () => {
    axios.get(`http://localhost:4000/getDetails?id=${searchInput}`).then((res) => {
      if (res.data.length > 0) {
        setDates(res.data[0].studentsAttendance[0].dates)
        if (res.data[0].studentsAttendance[0].totalAttendance < 75) {
          res.data[0].studentsAttendance[0].debarred = "Yes"
        }
        else {
          res.data[0].studentsAttendance[0].debarred = "No"
        }
        setStudent(res.data[0].studentsAttendance[0])
        setAlert(false)
      }
      else {
        setStudent([])
        setDates([])
        setAlert(true)
      }
    }).catch(err => console.log(err))
  }

  const getMonAtten = (year) => {
    let dStr = year+"-"+selDate;
    dates.map((item, index) => {
      if (item.includes(dStr)) {
        console.log(item)
      }
    })
  }

  const logout = () => {
    localStorage.clear();
    window.location.assign('/')
  }

  return (
    <>
      <nav id="homenav">
        <h1>Welcome, Dr. {localStorage.getItem('name')}</h1>
        <button onClick={() => logout()}>Logout</button>
      </nav>

      <div class="center-content">
        <input type="text" id="searchInput" onChange={(e) => setSearchInput(e.target.value)} placeholder="Enter Student Id" value={searchInput} />
        <button onClick={() => getDetail()}>Get Details</button>
        {alert ? <p style={{ "marginTop": "10px", "color": "red", "fontWeight": "600" }}>No records found!</p> : <></>}
      </div>

      <table>
        <tbody>
          <tr>
            <td>Student ID</td>
            <td>{student.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{student.name}</td>
          </tr>
          <tr>
            <td>Semester</td>
            <td>{student.sem}</td>
          </tr>
          <tr>
            <td>Total Attendance</td>
            <td>{student.totalAttendance}</td>
          </tr>
          <tr>
            <td>Department</td>
            <td>{student.department}</td>
          </tr>
          <tr style={{ background: student.debarred === "Yes" ? "red" : "white" }}>
            <td>Debarred</td>
            <td>{student.debarred}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div className="home_m_a">
        <h2>Get Monthly Attendance</h2>
        <div>
          <label for="dateSel">Select Date : </label>
          <select id="dateSel" onChange={(e) => setSelDate(e.target.value)}>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select id="yearSel" onChange={(e) => setYearDate(e.target.value)}>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div>
          <DateTheme
            month={selDate}
            year={yearDate}
            absentDates={dates}
          />
        </div>
      </div>
    </>
  );
};

export default Homepage;
