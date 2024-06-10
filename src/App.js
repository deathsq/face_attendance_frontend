import "./App.css";
import Login from "./Login";
import TeacherLogin from "./TeacherReg";
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DateTheme from "./DateTheme";
import Registration from "./Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<TeacherLogin />} />
        <Route exact path="/student-register" element={<Registration />} />
        <Route exact path="/home" element={<Homepage />} />
        <Route exact path="/date" element={<DateTheme />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
