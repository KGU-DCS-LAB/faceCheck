import React from "react";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import './App.css';
import Header from "./pages/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import VisitorManagement from "./pages/visitor-management/VisitorManagement";
import EmployeeRegister from "./pages/visitor-management/EmployeeRegister";
import EmployeeList from "./pages/visitor-management/EmployeeList";
import VisitorRegister from "./pages/visitor-management/VisitorRegister";
import VisitorList from "./pages/visitor-management/VisitorList";
import VisitorRequest from "./pages/visitor-management/VisitorRequest";
import EmployeeRequest from "./pages/visitor-management/EmployeeRequest";
import Sidebar from "./pages/Sidebar";
import Mypage from "./pages/employee-mypage/Mypage";
import EmployeeApprove from "./pages/employee-mypage/EmployeeApprove";
import SystemManagement from "./pages/system-management/SystemManagement";
import CompanyInformationEnter from "./pages/system-management/CompanyInformationEnter";
import EmployeeAccessRecord from "./pages/system-management/EmployeeAccessRecord";
import VisitorAccessRecord from "./pages/system-management/VisitorAccessRecord";
import FacialRecognitionRegister from "./pages/system-management/FacialRecognitionRegister";
import FacialRecognitionList from "./pages/system-management/FacialRecognitionList";
import CompanyInformationCamera from "./pages/system-management/CompanyInformationCamera";
import CompanyInformationCompanyList from "./pages/system-management/CompanyInformationCompanyList";
import VisitorApprove from "./pages/employee-mypage/VisitorApprove";

function LocationAwareComponent() {         //현재 페이지의 경로가 "/system-management" 또는 "/visitor-management"으로 시작하면 Sidebar 컴포넌트를 렌더링
    const location = useLocation();
    const isSystemManagementOrVisitorManagement =
        location.pathname.startsWith("/system-management") ||
        location.pathname.startsWith("/visitor-management") ||
        location.pathname.startsWith("/visitor-mypage") ||
        location.pathname.startsWith("/employee-mypage");

    return <div>{isSystemManagementOrVisitorManagement && <Sidebar />}</div>;
}
function App() {
  return (
    <BrowserRouter>
        <Header/>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1, width: "100%" }}>
                    <LocationAwareComponent />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/login" element={<Login />} />

                        //출입자 관리
                        <Route path="/visitor-management" element={<VisitorManagement />}>
                            <Route path="employee/register" element={<EmployeeRegister />} />
                            <Route path="visitor/register" element={<VisitorRegister />} />
                            <Route path="employee/list" element={<EmployeeList />} />
                            <Route path="visitor/list" element={<VisitorList />} />
                            <Route path="visitor/request" element={<VisitorRequest />} />
                            <Route path="employee/request" element={<EmployeeRequest />} />
                            {/*<Route element={<Outlet />} />*/}
                        </Route>

                        //시스템 관리
                        <Route path="/system-management" element={<SystemManagement />}>
                            <Route path="employee/accessRecord" element={<EmployeeAccessRecord />} />
                            <Route path="visitor/accessRecord" element={<VisitorAccessRecord />} />
                            <Route path="facialRecognition/register" element={<FacialRecognitionRegister />} />
                            <Route path="facialRecognition/list" element={<FacialRecognitionList />} />
                            <Route path="companyInformation/enter" element={<CompanyInformationEnter />} />
                            <Route path="companyInformation/camera" element={<CompanyInformationCamera />} />
                            <Route path="companyInformation/companyList" element={<CompanyInformationCompanyList />} />
                        </Route>

                        //직원 마이페이지
                        <Route path="/employee-mypage" element={<Mypage />}>
                            <Route path="employeeApprove" element={<EmployeeApprove />} />
                        </Route>

                        //방문자 마이페이지
                        <Route path="/visitor-mypage" element={<Mypage />}>
                            <Route path="visitorApprove" element={<VisitorApprove />} />
                        </Route>

                    </Routes>
                </div>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
