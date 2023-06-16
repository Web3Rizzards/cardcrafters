import "./style.css";

import * as Controller from "../Controller";

import React, { useContext } from "react";

type Props = {};

const TopNavBar: React.FC<Props> = (props) => {
  const { controllerState, setControllerState } = useContext(
    Controller.GlobalContext
  );

  return (
    <nav className="navbar">
      <img src="./src/public/favicon.svg" />

      <div className="navbar-buttons">
        <button
          className="navbar-button"
          onClick={(event) => {
            console.log("go to page: home");
            setControllerState(Controller.setPage("menu")(controllerState));
          }}
        >
          Home
        </button>
        <button
          className="navbar-button"
          onClick={(event) => {
            console.log("go to page: create");
            setControllerState(Controller.setPage("create")(controllerState));
          }}
        >
          Create
        </button>
        <button
          className="navbar-button"
          onClick={(event) => {
            console.log("go to page: play");
            setControllerState(Controller.setPage("play")(controllerState));
          }}
        >
          Play
        </button>
      </div>
      <div className="navbar-filler"></div>
    </nav>
  );
};

export default TopNavBar;
