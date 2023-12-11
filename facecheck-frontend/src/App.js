import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AccessManagement from "./pages/AccessManagement";
import FeatureIntroduction from "./pages/FeatureIntroduction";
import SystemManagement from "./pages/SystemManagement";
import VisitorManagement from "./pages/VisitorManagement";
import RouteWithSidebar from "./SidebarRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/access-management"
          element={<RouteWithSidebar element={<AccessManagement />} />}
        />
        <Route
          path="/feature-introduction"
          element={<RouteWithSidebar element={<FeatureIntroduction />} />}
        />
        <Route
          path="/system-management"
          element={<RouteWithSidebar element={<SystemManagement />} />}
        />
        <Route
          path="/visitor-management"
          element={<RouteWithSidebar element={<VisitorManagement />} />}
        />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
