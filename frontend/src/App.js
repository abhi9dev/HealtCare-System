import React from "react";
import { Router, Route, Routes, useMatch } from "react-router-dom";

import Login from "./pages/User/Login";
import LoginDefault from "./pages/LoginDefault";
import UserDashboard from "./pages/User/UserDashboard";
import BookAppointment from "./pages/User/BookAppointment";
import NotFound from "./pages/NotFound";
import "./App.css";
import SideMenu from "./component/SideMenu";
import DoctorLogin from "./pages/Doctor/doctorLogin";
import AdminLogin from "./pages/Admin/AdminLogin";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

function App() {
  // let { path, url } = useMatch();
  let pathName = window.location.pathname;
  let arr = pathName.toString().split("/");
  let currentPath = arr[arr.length - 1];

  return (
    <div className="App">
      {currentPath.length > 2 && <SideMenu />}
      <Routes>
        <Route path="/" element={<LoginDefault />} />
        <Route path="/ul" element={<Login />} />
        <Route path="/dl" element={<DoctorLogin />} />
        <Route path="/al" element={<AdminLogin />} />
        <Route path="/user/:id" element={<UserDashboard />} />
        <Route path="/doctor/:id" element={<DoctorDashboard />} />
        {/* <Route path="/user/book-appointment" elment={<BookAppointment />} /> */}
        <Route path="report" element={<BookAppointment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Route path="/user/reports" elment={} /> */}
    </div>
  );
}

export default App;
