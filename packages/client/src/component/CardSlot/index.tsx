import "./style.css";

import * as game from "../../data/game";

import Card from "../Card";
import React from "react";

type Props = { onClick: () => void; card?: game.Card };

const CardSlot: React.FC<Props> = ({ onClick, card }) => {
  if (!card) {
    return <div onClick={onClick} className="card-slot"></div>;
  } else {
    return <Card card={card}> </Card>;
  }
};

export default CardSlot;
