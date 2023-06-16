import "./style.css";

import * as game from "../../data/game";

import React from "react";

type Props = {
  card: game.Card;
};

export const Card: React.FC<Props> = (props) => (
  <div className="card">
    <div className="card-inner">
      <div className="card-header">
        <div className="card-cost">{props.card.cost}</div>
        <div className="card-name">{props.card.name}</div>
      </div>
      <div className="card-image">
        <img src={props.card.imageHref} alt="CARD IMAGE"></img>
      </div>
      <div className="card-body">
        <div className="card-ability">{props.card.abilityDescription}</div>
      </div>
      <div className="card-footer">
        <div className="card-attack">{props.card.attack}</div>
        <div className="card-logo">
          <img src="../public/favicon.svg" />
        </div>
        <div className="card-health">{props.card.health}</div>
      </div>
    </div>
  </div>
);
