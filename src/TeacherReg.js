import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios';

const TeacherLogin = () => {
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // function handleLogin() {
   
  //   console.log("Teacher ID:", teacherId);
  // console.log("Password:", password);
  // }  
    
  const register = () => {
    axios.post('http://localhost:4000/facRegister', {
      "id": teacherId,
      "password": password,
      "name": name
    }).then((res) => {
      console.log(res)
      var ele = document.getElementById("msg");
      if (res.data.msg === "success") {
        ele.innerHTML += 'Registration Successful<i className="bi bi-check-circle"></i>';
        ele.style.color = "white"
        setPassword("")
        setTeacherId("")
        setName("")
        return;
      }
      ele.innerText = "Registration Failed";
      ele.style.color = "red"
    }).catch(err => console.log(err))
  }



  return (
    <div>
      <video width="600" height="400" id="myVideo" loop>
        <source src="lines.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
     

        <section>
          <form>
            <h1>REGISTER</h1>
            <div className="inputbox">
              <ion-icon name="person-outline"></ion-icon>
              <input
                value={teacherId}
                type="text"
                placeholder="Teacher ID"
                onChange={(e) => setTeacherId(e.target.value)}
                required
              />
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                value={name}
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <p id="msg"></p>
            <button type="button" id="loginButton" onClick={() => register()}>
              Register
            </button>
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
}

export default TeacherLogin;
