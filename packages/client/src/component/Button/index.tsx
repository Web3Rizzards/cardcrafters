import "./style.css";

import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div className="button" onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
