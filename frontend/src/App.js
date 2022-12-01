import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginDefault from "./pages/LoginDefault";

import UserLogin from "./pages/User/Login";
import UserDashboard from "./pages/User/UserDashboard";
import MedicalHistory from "./pages/User/MedicalHistory";
import EditProfile from "./pages/User/EditProfile";
import NearbyDoctor from "./pages/User/NearbyDoctor";

import NotFound from "./pages/NotFound";

import DoctorLogin from "./pages/Doctor/doctorLogin";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorEditProfile from "./pages/Doctor/editProfile";
import TreatPatient from "./pages/Doctor/TreatPatient";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDisplayData from "./pages/Admin/DisplayData";
import AdminApproveRequest from "./pages/Admin/ApproveRequest";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRegisterUser from "./pages/Admin/RegisterUser";

import "./App.css";

function App() {
  // let { path, url } = useMatch();
  let pathName = window.location.pathname;
  let arr = pathName.toString().split("/");
  let currentPath = arr[arr.length - 1];

  return (
    <div className="App">
      {/* {currentPath.length > 2 && <SideMenu />} */}
      <Routes>
        <Route path="/" element={<LoginDefault />} />
        <Route path="/ul" element={<UserLogin />} />
        <Route path="/dl" element={<DoctorLogin />} />
        <Route path="/al" element={<AdminLogin />} />

        <Route path="/user/:id" element={<UserDashboard />} />
        <Route path="/user/:id/history" element={<MedicalHistory />} />
        <Route path="/user/:id/nearDoc" element={<NearbyDoctor />} />
        <Route path="/user/:id/editProfile" element={<EditProfile />} />

        <Route path="/doctor/:id" element={<DoctorDashboard />} />
        <Route path="/doctor/:id/treatPatient" element={<TreatPatient />} />
        <Route path="/doctor/:id/editProfile" element={<DoctorEditProfile />} />

        <Route path="/admin/:id" element={<AdminDashboard />} />
        <Route path="/admin/:id/displayData" element={<AdminDisplayData />} />
        <Route
          path="/admin/:id/approveRequest"
          element={<AdminApproveRequest />}
        />
        <Route path="/admin/:id/registerUser" element={<AdminRegisterUser />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
