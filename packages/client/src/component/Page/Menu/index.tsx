import "./style.css";

import * as Controller from "../../Controller";
import * as Page from "../../Page";

import React, { useContext } from "react";

import Button from "../../Button";

type Props = {};

export const Menu: React.FC<Props> = (props) => {
  let { controllerState, setControllerState } = useContext(
    Controller.GlobalContext
  );

  return (
    <Page.Page name="menu">
      <div className="menu-page-inner">
        <div className="menu-items">
          <div className="menu-item">
            <Button
              onClick={(event) => {
                console.log("go to page: create");
                setControllerState(
                  Controller.setPage("create")(controllerState)
                );
              }}
            >
              Create
            </Button>
          </div>
          <div className="menu-item">
            <Button
              onClick={(event) => {
                console.log("go to page: play");
                setControllerState(Controller.setPage("play")(controllerState));
              }}
            >
              Play
            </Button>
          </div>
        </div>
      </div>
    </Page.Page>
  );
};
