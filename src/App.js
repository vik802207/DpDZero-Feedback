import { useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { BrowserRouter, Route ,Routes } from "react-router-dom";
import ManagerSignup from "./pages/ManagerSignup";
import ManagerLogin from "./pages/ManagerLogin";
import EmployeeSignup from "./pages/EmployeeSignup";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import EmployeeLogin from "./pages/EmployeeLogin";
import HomePage from "./pages/HomePage";

function App() {
 

  return <>
  
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/manager/signup" element={<ManagerSignup/>}/>
    <Route path="/manager/login" element={<ManagerLogin/>}/>
    <Route path="/employee/signup" element={<EmployeeSignup/>}/>
    <Route path="/employee/login" element={<EmployeeLogin/>}/>
    <Route path="/employee/dashboard" element={<EmployeeDashboard/>} />
    <Route path="/manager/dashboard" element={<ManagerDashboard/>}/>
    </Routes>

  </BrowserRouter>
  
  </>
}
export default App;
