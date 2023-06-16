import "./style.css";

import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <div className={className ? className : "button"} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
