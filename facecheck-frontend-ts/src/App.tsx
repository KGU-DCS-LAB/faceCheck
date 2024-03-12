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
import VisitorMypage from "./pages/visitor-mypage/VisitorMypage";
import EmployeeMypage from "./pages/employee-mypage/EmployeeMypage";

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

                        //직원 마이페이지
                        <Route path="/employee-mypage" element={<EmployeeMypage />}>
                        </Route>

                        //방문자 마이페이지
                        <Route path="/visitor-mypage" element={<VisitorMypage />}>
                        </Route>

                    </Routes>
                </div>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
