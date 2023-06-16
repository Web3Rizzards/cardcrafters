import "./style.css";

import React from "react";

export type Props = {
  name: string;
  children: JSX.Element | JSX.Element[] | undefined;
};

export const Page: React.FC<Props> = (props) => {
  console.log("rendering page");
  return (
    <div className={["page", props.name].join(" ")}>
      {/* <div className="page-title">{props.name}</div> */}

      <div className="page-body">{props.children}</div>
    </div>
  );
};
