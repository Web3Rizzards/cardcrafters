import "./style.css";

import * as game from "../../data/game";

import React from "react";

type Props = { onClick: () => void };

const CardSlot: React.FC<Props> = ({ onClick }) => (
  <div onClick={onClick} className="card-slot"></div>
);

export default CardSlot;
