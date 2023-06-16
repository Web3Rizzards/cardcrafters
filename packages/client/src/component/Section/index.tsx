import "./style.css";

import React from "react";

type PageSectionProps = {
  backgroundImage: string;
  colour: string;
  children: ReactNode;
};

const PageSection: React.FC<PageSectionProps> = ({
  backgroundImage,
  colour,
  children,
}) => {
  return (
    <div
      className="section-container"
      style={{
        background: colour,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {children}
    </div>
  );
};

export default PageSection;
