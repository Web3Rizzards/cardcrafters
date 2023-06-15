import "./style.css";

import * as Card from "../../Card";
import * as Controller from "../../Controller";
import * as Page from "../../Page";
import * as game from "../../../data/game";

import React, { useContext, useState } from "react";

import Button from "../../Button";
import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../../../MUDContext";

type Props = {};

export const Play: React.FC<Props> = (props) => {
  let { controllerState, setControllerState } = useContext(
    Controller.GlobalContext
  );

  const {
    components: { Counter, Game },
    systemCalls: {
      increment,
      createCard,
      summonCard,
      joinPlayer1,
      joinPlayer2,
    },
    network: { singletonEntity },
  } = useMUD();
  const counter = useComponentValue(Counter, singletonEntity);
  const players = useComponentValue(Game, singletonEntity);

  const [name, setName] = useState("");
  const [cardSlot, setCardSlot] = useState(0);
  const [target, setTarget] = useState(0);

  return (
    <Page.Page name="play">
      {/* <button onClick={event => {
        console.log("go to page: menu")
        setControllerState(Controller.setPage('menu')(controllerState))
      }}>Menu</button> */}

      {/* <div>This is the "play" page</div> */}
      <div className="game">
        <div className="game-sidebar game-leftSidebar">
          <div>
            <b>Left Sidebar</b>
          </div>
          <div>Available cards</div>
        </div>
        <div className="game-center">
          {/* Opponent's hand */}
          <div className="game-hand game-opponentHand">
            <Card.Card card={game.exampleCard1}></Card.Card>
            <Card.Card card={game.exampleCard1}></Card.Card>
          </div>

          {/* Opponent's field */}
          <div className="game-field game-opponentField">
            <Card.Card card={game.exampleCard1}></Card.Card>
            <Card.Card card={game.exampleCard1}></Card.Card>
          </div>
          <div className="game-fieldDivider"></div>

          {/* Player's field */}
          <div className="game-field game-playerField">
            <Card.Card card={game.exampleCard1}></Card.Card>
            <Card.Card card={game.exampleCard1}></Card.Card>
          </div>

          {/* Player's hand */}
          <div className="game-hand game-playerHand">
            <Card.Card card={game.exampleCard1}></Card.Card>
            <Card.Card card={game.exampleCard1}></Card.Card>
          </div>
        </div>
        <div className="game-sidebar game-rightSidebar">
          <div>
            <b>Right Sidebar</b>
          </div>

          {/* <button>Join Player 1</button>
          <button>Join Player 2</button>
          <button>Forfeit</button>
          <button>Claim Victory</button>
          <button>Attack</button>
          <button>End Turn</button> */}

          <div>
            <div>
              Card Name
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>
            <div>
              Card Slot (0 to 4)
              <input
                onChange={(e) => {
                  setCardSlot(Number(e.target.value));
                }}
              ></input>
            </div>
            <div>
              Target (0 to 4)
              <input
                onChange={(e) => {
                  setTarget(Number(e.target.value));
                }}
              ></input>
            </div>

            <div>Player 1 Health:</div>
            <div>Player 2 Health:</div>
            <Button onClick={() => createCard(name)}>Create Card</Button>
            <Button onClick={() => joinPlayer1()}>
              {players?.player1 ? players?.player1 : "Join player 1"}
            </Button>
            <Button onClick={() => joinPlayer2()}>
              {players?.player2 ? players?.player2 : "Join player 2"}
            </Button>
            <Button onClick={() => summonCard(name, Number(cardSlot))}>
              Summon Card
            </Button>
            <Button onClick={() => endTurn(name, Number(cardSlot))}>
              End Turn
            </Button>
            <Button onClick={() => forfeit(name, Number(cardSlot))}>
              Forfeit
            </Button>
            <Button onClick={() => forfeitOpponent(name, Number(cardSlot))}>
              Forfeit Opponent
            </Button>
            <Button onClick={() => win(name, Number(cardSlot))}>Win</Button>
            <Button onClick={() => attack(name, Number(cardSlot))}>
              Attack
            </Button>
            <Button onClick={() => attackPlayer(name, Number(cardSlot))}>
              Attack Player
            </Button>
          </div>
        </div>
      </div>
    </Page.Page>
  );
};
