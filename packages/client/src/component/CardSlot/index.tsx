import "./style.css";

import * as game from "../../data/game";

import Card from "../Card";
import React from "react";

type Props = {
  id: string;
  onClick: () => void;
  card?: game.Card;
  active: boolean;
};

const CardSlot: React.FC<Props> = ({ id, onClick, card, active }) => {
  if (!card) {
    return (
      <div
        onClick={() => {
          onClick();
          console.log("ASD");
        }}
        className="card-slot"
      ></div>
    );
  } else {
    return (
      <Card
        onSelectCard={() => {
          onClick();
          console.log("ASD");
        }}
        card={card}
        active={active}
      >
        {" "}
      </Card>
    );
  }
};

export default CardSlot;
