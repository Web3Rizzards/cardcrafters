import "./style.css";

import React, { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return <div className="sidebar">{children}</div>;
};

export default Sidebar;
