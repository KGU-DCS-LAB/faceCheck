import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AccessManagement from "./pages/AccessManagement";
import FeatureIntroduction from "./pages/FeatureIntroduction";
import SystemManagement from "./pages/system-management/SystemManagement";
import VisitorManagement from "./pages/visitor-management/VisitorManagement";
//import MyPage from "./pages/Mypage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Sidebar from "./components/Sidebar";
import "./App.css";
import EmployeeAccessRecord from "./pages/system-management/EmployeeAccessRecord";
import VisitorAccessRecord from "./pages/system-management/VisitorAccessRecord";
import FacialRecognitionList from "./pages/system-management/FacialRecognitionList";
import FacialRecognitionRegister from "./pages/system-management/FacialRecognitionRegister";
import EmployeeRegister from "./pages/visitor-management/EmployeeRegister";
import VisitorRegister from "./pages/visitor-management/VisitorReigster";
import VisitorList from "./pages/visitor-management/VisitorList";
import EmployeeList from "./pages/visitor-management/EmployeeList";
import SignUp from "./pages/SignUp";

function LocationAwareComponent() {
  const location = useLocation();
  const isSystemManagementOrVisitorManagement =
    location.pathname.startsWith("/system-management") ||
    location.pathname.startsWith("/visitor-management");

  return <div>{isSystemManagementOrVisitorManagement && <Sidebar />}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", marginTop: "50px" }}>
          <LocationAwareComponent />
          <div style={{ width: "100%" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/access-management" element={<AccessManagement />} />
              <Route
                path="/feature-introduction"
                element={<FeatureIntroduction />}
              />

              <Route
                path="/system-management"
                element={
                  <>
                    <SystemManagement />
                    <Outlet />
                  </>
                }
              >
                <Route
                  path="/system-management/employee/accessRecord"
                  element={<EmployeeAccessRecord />}
                />
                <Route
                  path="/system-management/visitor/accessRecord"
                  element={<VisitorAccessRecord />}
                />
                <Route
                  path="/system-management/facialRecognition/register"
                  element={<FacialRecognitionRegister />}
                />
                <Route
                  path="/system-management/facialRecognition/list"
                  element={<FacialRecognitionList />}
                />
              </Route>

              <Route
                path="/visitor-management"
                element={
                  <>
                    <VisitorManagement />
                    <Outlet />
                  </>
                }
              >
                <Route
                  path="/visitor-management/employee/register"
                  element={<EmployeeRegister />}
                />
                <Route
                  path="/visitor-management/visitor/register"
                  element={<VisitorRegister />}
                />
                <Route
                  path="/visitor-management/employee/list"
                  element={<EmployeeList />}
                />
                <Route
                  path="/visitor-management/visitor/list"
                  element={<VisitorList />}
                />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
