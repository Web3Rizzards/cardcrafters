import "./style.css";

import * as game from "../../data/game";

import React from "react";

type Props = {
  card: game.Card;
  onSelectCard: (cardName: string) => void;
  active: boolean;
};

const Card: React.FC<Props> = ({ card, onSelectCard, active }) => (
  <div
    className={`card ${active ? "active" : ""}`}
    onClick={() => onSelectCard(card)}
  >
    <div className="card-inner">
      <div className="card-header">
        <div className="card-cost">{card.cost}</div>
        <div className="card-name">
          <div className="card-name-inner">{card.name}</div>
        </div>
      </div>
      <div className="card-image">
        {/* <img src={card.image} alt="CARD IMAGE" draggable={false}></img> */}
        {/* <img src={`data:image/png;base64, ${card.image}`} alt="CARD IMAGE" draggable={false}></img> */}
        <img src={card.image} alt="CARD IMAGE" draggable={false}></img>
      </div>
      <div className="card-body">
        <div className="card-ability">
          {card.ability !== undefined ? game.showAbility(card.ability) : []}
        </div>
        <div className="card-description">{card.description}</div>
      </div>
      <div className="card-footer">
        <div className="card-attack">
          {" "}
          <div className="card-attack-inner">{card.attack}</div>{" "}
        </div>
        <div className="card-logo">
          <img src="./src/public/card-logo.svg" />
        </div>
        <div className="card-health">
          {" "}
          <div className="card-health-inner">{card.health}</div>{" "}
        </div>
      </div>
    </div>
  </div>
);

export default Card;
