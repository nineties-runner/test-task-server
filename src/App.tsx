import React from "react";
import SideBar from "./components/SideBar";
import { menuItems } from "./constants";
import Monitoring from "./components/Monitoring";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="flex">
      <SideBar items={menuItems} />
      <Routes>
        <Route path="/cmdb/servers" element={<Monitoring />} />
      </Routes>
    </div>
  );
};

export default App;
