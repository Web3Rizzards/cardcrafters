import "./style.css";

import * as game from "../../data/game";

import React from "react";

type Props = {
  card: game.Card;
};

const Card: React.FC<Props> = (props) => (
  <div className="card">
    <div className="card-inner">
    <div className="card-header">
      <div className="card-cost">{props.card.cost}</div>
      <div className="card-name">{props.card.name}</div>
    </div>
    <div className="card-image">
      <img src={props.card.image} alt="CARD IMAGE" draggable={false}></img>
      {/* <img src={`"data:image/png;base64, ${props.card.image}`} alt="CARD IMAGE" draggable={false}></img> */}
    </div>
    <div className="card-body">
      <div className="card-ability">{props.card.abilityDescription}</div>
    </div>
    <div className="card-footer">
      <div className="card-attack"> <div className="card-attack-inner">{props.card.attack}</div> </div>
      <div className="card-logo">
        <img src="./src/public/card-logo.svg" />
      </div>
      <div className="card-health"> <div className="card-health-inner">{props.card.health}</div> </div>
    </div>
    </div>
  </div>
);

export default Card;
