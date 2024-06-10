import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './style.css';
import axios from 'axios';

const Login = () => {
  const [teacherId, setTeacherId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(localStorage.getItem("isLogged") && localStorage.getItem("id")){
      window.location.assign('/home')
    }
  },[])
  
  // function run() {
  //   console.log(email,password);
  //   var video = document.getElementById("myVideo");
  //   video.play();
  // }

  function handleLogin() {
    axios.post('http://localhost:4000/facLogin',{
      "id":teacherId,
      "password":password
    }).then((res) => {
      console.log(res)
      if(res.data.msg === "success"){
        localStorage.setItem("isLogged",true)
        localStorage.setItem("id",res.data.data[0].id)
        localStorage.setItem("name",res.data.data[0].name)
        window.location.assign('/home')
        return;
      }
      document.getElementById("alert").innerText = "Authentication Failed!"
    }).catch(err => console.log(err))
  }

  return (
    <div>
    <video width="600" height="400" id="myVideo" loop>
   <source src="lines.mp4" type="video/mp4" />
   Your browser does not support the video tag.
 </video>
 <div>
   <h3>TEACHER LOGIN</h3>
   <section>
     <form>
       <h1>Login</h1>
       <div className="inputbox">
         <ion-icon name="person-outline"></ion-icon>
         <input
           type="text"
           placeholder="Teacher ID"
           onChange={(e) => setTeacherId(e.target.value)}
           required
         />
       </div>
       <div className="inputbox">
         <ion-icon name="lock-closed-outline"></ion-icon>
         <input
           type="password"
           placeholder="Password"
           onChange={(e) => setPassword(e.target.value)}
           required
         />
       </div>
       <button type="button" onClick={()=>handleLogin()} id="loginButton">
         Log in
       </button>
       <p id="alert"></p>
       <div className="register">
         <p>
           Don't have an account? <Link to="/register">Register</Link>
         </p>
       </div>
     </form>
   </section>
 </div>
</div>
  );
}

export default Login;
