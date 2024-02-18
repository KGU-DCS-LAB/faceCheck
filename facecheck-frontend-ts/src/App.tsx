import React from "react";
import {BrowserRouter, Routes, Route, Outlet, useLocation} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from "./Header";
import Main from "./Main";

function App() {
  return (
    <BrowserRouter>
        <Header/>
        {/*<div style={{ display: "flex", flexDirection: "column" }}>*/}
        {/*    <div style={{ display: "flex" }}>*/}
        {/*        <div style={{ flex: 1, width: "100%" }}>*/}
                      <Routes>
                          <Route path="/" element={<Main />} />

                      </Routes>
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </BrowserRouter>
  );
}

export default App;