// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRegist from './pages/UserRegist';
import Home from './pages/Home';
import EmployeeRegistration from './pages/EmployeeRegist';
import VisitorRegistration from './pages/VisitorRegist';

function App() {
  return (
<>
<BrowserRouter>
<Routes>
<Route path="/" element={<Home />} />
  <Route path="/userRegist" element={<UserRegist />} />
  <Route path="/employee" element={<EmployeeRegistration />} />
  <Route path="/visitor" element={<VisitorRegistration />} />
  {/* 기타 라우트 정의 */}
</Routes>
</BrowserRouter>
</>
  );
}

export default App;
