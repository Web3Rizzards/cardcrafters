import "./style.css";

import React, { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

const TopNavBar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="top-navbar">
      <img src="./public/logo.svg" alt="craftooors"></img>
    </div>
  );
};

export default Sidebar;
