import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AccessManagement from "./pages/AccessManagement";
import SystemManagement from "./pages/system-management/SystemManagement";
import VisitorManagement from "./pages/visitor-management/VisitorManagement";
import MyPage from "./pages/Mypage"
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
// import CompanyInfoRegister from "./pages/system-management/CompanyInfoRegister";
// import CameraRegister from "./pages/system-management/CameraRegister";
// import CompanyList from "./pages/system-management/CompanyList";
// import VisitorRequest from "./pages/visitor-management/VisitorRequest";
// import EmployeeRequest from "./pages/visitor-management/EmployeeRequest";

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
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, width: "100%" }}>
            <LocationAwareComponent />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/access-management" element={<AccessManagement />} />

              <Route path="/system-management" element={<SystemManagement />}>
                <Route
                  path="employee/accessRecord"
                  element={<EmployeeAccessRecord />}
                />
                <Route
                  path="visitor/accessRecord"
                  element={<VisitorAccessRecord />}
                />
                <Route
                  path="facialRecognition/register"
                  element={<FacialRecognitionRegister />}
                />
                <Route
                  path="facialRecognition/list"
                  element={<FacialRecognitionList />}
                />
                {/*<Route*/}
                {/*  path="companyInformation/enter"*/}
                {/*  element={<CompanyInfoRegister />}*/}
                {/*/>*/}
                {/*<Route*/}
                {/*  path="companyInformation/camera"*/}
                {/*  element={<CameraRegister />}*/}
                {/*/>*/}
                {/*<Route*/}
                {/*  path="companyInformation/companyList"*/}
                {/*  element={<CompanyList />}*/}
                {/*/>*/}
                <Route element={<Outlet />} />{" "}
              </Route>

              <Route path="/visitor-management" element={<VisitorManagement />}>
                <Route
                  path="employee/register"
                  element={<EmployeeRegister />}
                />
                <Route path="visitor/register" element={<VisitorRegister />} />
                <Route path="employee/list" element={<EmployeeList />} />
                <Route path="visitor/list" element={<VisitorList />} />
                {/*<Route path="visitor/request" element={<VisitorRequest />} />*/}
                {/*<Route path="employee/request" element={<EmployeeRequest />} />*/}
                <Route element={<Outlet />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
