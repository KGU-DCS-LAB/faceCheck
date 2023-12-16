import React from "react";
import Sidebar from "./components/Sidebar";

const RouteWithSidebar = ({ element: Element, ...rest }) => {
  if (!Element || typeof Element !== "function") {
    console.error("Invalid Element prop:", Element);
    return null;
  }

  // 이전과 같은 코드

  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: "200px" }}>
        <Element {...rest} />
      </div>
    </>
  );
};

export default RouteWithSidebar;
