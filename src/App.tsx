import React from "react";
import { Route, Routes } from "react-router-dom";

import SideBar from "./components/SideBar";
import Monitoring from "./components/Monitoring";
import { menuItems } from "./constants";

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
