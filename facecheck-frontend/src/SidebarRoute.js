import React from "react";
import Sidebar from "./components/Sidebar";

const RouteWithSidebar = ({ element: Element, ...rest }) => {
  if (!Element || typeof Element !== "function") {
    // Handle invalid Element prop (optional: add more specific error handling)
    return null;
  }

  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: "200px" /* Adjust the margin as needed */ }}>
        <Element {...rest} />
      </div>
    </>
  );
};

export default RouteWithSidebar;
