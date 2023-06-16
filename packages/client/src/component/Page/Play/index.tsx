import "./style.css";

import * as Controller from "../../Controller";
import * as Page from "../../Page";
import * as game from "../../../data/game";

import { Has, HasValue, getComponentValueStrict } from "@latticexyz/recs";
import React, { useContext, useState } from "react";

import Button from "../../Button";
import Card from "../../Card";
import CardSlot from "../../CardSlot";
import { useComponentValue } from "@latticexyz/react";
import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../../../MUDContext";
import { useRow } from "@latticexyz/react";

type Props = {};

export const Play: React.FC<Props> = (props) => {
  let { controllerState, setControllerState } = useContext(
    Controller.GlobalContext
  );

  const {
    components: { Counter, Game, Card: CardComponent, Owner },
    systemCalls: {
      increment,
      createCard,
      summonCard,
      joinPlayer1,
      joinPlayer2,
    },
    network: { singletonEntity },
  } = useMUD();

  const entities = useEntityQuery([
    Has(Owner),
    HasValue(Owner, { creator: "0xdb511450fc0e4ca9e28c8a5a4505d725250aa5e1" }),
  ]);
  console.log("🚀 | entities:", entities);

  const counter = useComponentValue(Counter, singletonEntity);
  const players = useComponentValue(Game, singletonEntity);

  const [name, setName] = useState("");
  const [player1FieldIndex, setPlayer1FieldIndex] = useState(0);
  const [player2FieldIndex, setPlayer2FieldIndex] = useState(0);

  const [player1Card, setPlayer1Card] = useState(0);
  const [player2Card, setPlayer2Card] = useState(0);

  // Given the entity ids get player card details
  function getPlayerCards(): game.Card[] {}

  return (
    <Page.Page name="play">
      {/* <button onClick={event => {
        console.log("go to page: menu")
        setControllerState(Controller.setPage('menu')(controllerState))
      }}>Menu</button> */}

      {/* <div>This is the "play" page</div> */}
      <div className="game">
        {/* <div className="game-sidebar game-leftSidebar">
          <div>
            <b>Left Sidebar</b>
          </div>
          <div>Available cards</div>
        </div> */}
        <div className="game-center">
          {/* Opponent's hand */}
          <div className="game-hand game-opponentHand">
            {}
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
          </div>

          {/* Player 1 Stats */}
          <div className="game-stats">
            <div className="health-bar">
              <div
                className="health-bar-fill"
                style={{ width: (30 / 30) * 100 + "%" }}
              >
                <span className="health-bar-text">{30}</span>
              </div>
            </div>
            <div className="game-stats-mana">0 / 10</div>
          </div>

          {/* Player 1 field */}
          <div className="game-field game-opponentField">
            <CardSlot
              onClick={() => {
                setPlayer1FieldIndex(0);
                console.log("XXX");
              }}
            ></CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(1)}></CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(2)}> </CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(3)}></CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(4)}></CardSlot>
          </div>
          <div className="game-fieldDivider"></div>

          {/* Player 2 field */}
          <div className="game-field game-playerField">
            <CardSlot
              onClick={() => setPlayer2FieldIndex(0)}
              card={game.exampleCard1}
            ></CardSlot>
            <CardSlot onClick={() => setPlayer2FieldIndex(1)}></CardSlot>
            <CardSlot onClick={() => setPlayer2FieldIndex(2)}></CardSlot>
            <CardSlot onClick={() => setPlayer2FieldIndex(3)}></CardSlot>
            <CardSlot onClick={() => setPlayer2FieldIndex(4)}></CardSlot>
          </div>

          {/* Player 2 Stats */}
          <div className="game-stats">
            <div className="health-bar">
              <div
                className="health-bar-fill"
                style={{ width: (30 / 30) * 100 + "%" }}
              >
                <span className="health-bar-text">{30}</span>
              </div>
            </div>
            <div className="game-stats-mana">0 / 10</div>
          </div>

          {/* Player 2 hand */}
          <div className="game-hand game-playerHand">
            <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card>
          </div>
        </div>
        <div className="game-sidebar game-rightSidebar">
          <div>
            <div>Player 1 Field Index (0 to 4): {player1FieldIndex}</div>
            <div>Player 2 Field Index (0 to 4): {player2FieldIndex}</div>

            <Button onClick={() => joinPlayer1()}>
              {players?.player1 ? players?.player1 : "Join player 1"}
            </Button>
            <Button onClick={() => joinPlayer2()}>
              {players?.player2 ? players?.player2 : "Join player 2"}
            </Button>
            <Button onClick={() => summonCard(name, Number(player1FieldIndex))}>
              Summon Card
            </Button>
            {/* <Button onClick={() => endTurn(name, Number(player1FieldIndex))}>
              End Turn
            </Button>
            <Button onClick={() => forfeit(name, Number(player1FieldIndex))}>
              Forfeit
            </Button>
            <Button onClick={() => forfeitOpponent(name, Number(player1FieldIndex))}>
              Forfeit Opponent
            </Button>
            <Button onClick={() => win(name, Number(player1FieldIndex))}>Win</Button>
            <Button onClick={() => attack(name, Number(player1FieldIndex))}>
              Attack
            </Button>
            <Button onClick={() => attackPlayer(name, Number(player1FieldIndex))}>
              Attack Player
            </Button> */}
          </div>
        </div>
      </div>
    </Page.Page>
  );
};
