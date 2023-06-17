import "./style.css";

import * as Controller from "../../Controller";
import * as Page from "../../Page";
import * as game from "../../../data/game";

import { Has, HasValue, getComponentValueStrict } from "@latticexyz/recs";
import React, { useContext, useEffect, useState } from "react";

import Button from "../../Button";
import Card from "../../Card";
import CardSlot from "../../CardSlot";
import { ethers } from "ethers";
import { useComponentValue } from "@latticexyz/react";
import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../../../MUDContext";
import { useRow } from "@latticexyz/react";

type Props = object;

//Zero Address
const zeroAddress = ethers.constants.AddressZero;

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
}

export const Play: React.FC<Props> = (props) => {
  const { controllerState, setControllerState } = useContext(
    Controller.GlobalContext
  );

  const {
    components: { Counter, Game, Card: CardComponent, Owner, Board, Metadata },
    systemCalls: {
      increment,
      createCard,
      attack,
      summonCard,
      joinPlayer1,
      joinPlayer2,
      startGame,
    },
    network: { singletonEntity, playerEntity },
  } = useMUD();

  const forceUpdate = useForceUpdate();

  // const { world } = useMUD;
  // console.log("🚀 | world:", world);

  function getUserAddress(playerEntity: string) {
    return "0x" + playerEntity.slice(26);
  }
  console.log("🚀 | playerEntity:", playerEntity);

  Board.update$.subscribe((update) => {
    const [nextValue, prevValue] = update.value;
    console.log("Board updated", update, { nextValue, prevValue });
    setBoard(getBoard(boardEntities));
    forceUpdate();
    console.log(board);
  });

  CardComponent.update$.subscribe((update) => {
    const [nextValue, prevValue] = update.value;
    console.log("CardComponent updated", update, { nextValue, prevValue });
  });

  const counter = useComponentValue(Counter, singletonEntity);
  const meta = useComponentValue(Game, singletonEntity);

  const currentPlayer = () => {
    if (meta?.player1.toLowerCase() === getUserAddress(playerEntity)) {
      return "player1";
    } else if (meta?.player2.toLowerCase() === getUserAddress(playerEntity)) {
      return "player2";
    } else {
      return "spectator";
    }
  };

  const [name, setName] = useState("");
  const [player1FieldIndex, setPlayer1FieldIndex] = useState(0);
  const [player2FieldIndex, setPlayer2FieldIndex] = useState(0);

  const [player1Card, setPlayer1Card] = useState(""); // To set with the name of the card
  const [player2Card, setPlayer2Card] = useState(""); // To set with the name of the card

  const [board, setBoard] = useState(game.empty_board);

  // Get user addr
  const userAddr = getUserAddress(playerEntity);
  console.log("🚀 | userAddr:", userAddr);

  // Given the entity ids get player card details
  const player1CardEntities: string[] = useEntityQuery([
    Has(Owner),
    HasValue(Owner, { creator: meta?.player1 }),
  ]);

  const player2CardEntities: string[] = useEntityQuery([
    Has(Owner),
    HasValue(Owner, { creator: meta?.player2 }),
  ]);

  console.log(meta?.player1);
  console.log(meta?.player2);
  console.log("🚀 | playerCardEntities:", player1CardEntities);
  console.log("🚀 | playerCardEntities:", player2CardEntities);

  // For SummonCard
  const getCurrentSelectedField = () => {
    if (currentPlayer() === "player1") {
      return Number(player1FieldIndex);
    } else if (currentPlayer() === "player2") {
      return Number(player2FieldIndex);
    } else {
      return "";
    }
  };

  const getCurrentSelectedCard = () => {
    if (currentPlayer() === "player1") {
      return player1Card;
    } else if (currentPlayer() === "player2") {
      return player2Card;
    } else {
      return "";
    }
  };

  const getAttackingCard = () => {
    if (currentPlayer() === "player1") {
      return board.player1[Number(player1FieldIndex)];
    } else if (currentPlayer() === "player2") {
      return board.player2[Number(player2FieldIndex)];
    } else {
      return { name: "" };
    }
  };

  const getTargetCard = () => {
    if (currentPlayer() === "player1") {
      return board.player2[Number(player2FieldIndex)];
    } else if (currentPlayer() === "player2") {
      return board.player1[Number(player1FieldIndex)];
    } else {
      return { name: "" };
    }
  };

  function getPlayerCards(playerCardEntities: string[]): game.Card[] {
    const results = playerCardEntities.map((entity) => {
      const out = getComponentValueStrict(CardComponent, entity);
      const out2 = getComponentValueStrict(Metadata, entity);
      return { ...out, ...out2 };
    });
    console.log("🚀 | getPlayerCards | results:", results);
    return results;
  }

  function onSelectCardP1(card: game.Card) {
    console.log("🚀 | onSelectCard | card:", card);
    setPlayer1Card(card);
  }

  function onSelectCardP2(card: game.Card) {
    console.log("🚀 | onSelectCard | card:", card);
    setPlayer2Card(card);
  }

  // Get the Board
  const boardEntities: string[] = useEntityQuery([Has(Board)]);

  function getBoard(boardEntities: string[]): game.Board {
    let newBoard = game.empty_board;
    const results = boardEntities.map((entity) => {
      const out = getComponentValueStrict(Board, entity);
      console.log("🚀 | results | out:", out);

      // filter player 1 cards

      const out2 = getComponentValueStrict(Metadata, entity);
      return { ...out, ...out2 };
    });

    let player1 = newBoard.player1;
    let player2 = newBoard.player1;
    for (let i = 0; i < results.length; i++) {
      const slot = results[i].slot;
      console.log("🚀 | getBoard | slot:", slot);

      const card = results[i];
      console.log("🚀 | getBoard | card:", card);

      if (results[i].player === meta?.player1) {
        player1 = { ...player1, [slot]: results[i] };
        console.log("🚀 | getBoard | player1:", player1);
      } else if (results[i].player === meta?.player2) {
        player2 = { ...player2, [slot]: results[i] };
      }
      newBoard = { ...newBoard, player1, player2 };
    }
    console.log("🚀 | getBoard | newBoard:", newBoard);

    return newBoard;
  }

  useEffect(() => setBoard(getBoard(boardEntities)), []);

  return (
    <Page.Page name="play">
      <div className="game">
        <div className="game-center">
          {/* Player 1 Hand */}
          <div className="game-hand game-opponentHand">
            {/* Show Join button if player 1, else show the cards */}

            {meta?.player1 ? (
              // <div className="game-hand-cards">
              getPlayerCards(player1CardEntities).map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  onSelectCard={onSelectCardP1}
                  active={card.name === player1Card.name}
                ></Card>
              ))
            ) : (
              // </div>
              <Button onClick={() => joinPlayer1()} className="join">
                {meta?.player1 ? meta?.player1 : "Join player 1"}
              </Button>
            )}
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
            <div className="mana-bar">
              <span className="mana-bar-text">
                {1}/{5}
              </span>
              <div
                className="mana-bar-fill"
                style={{ width: (1 / 5) * 100 + "%" }}
              ></div>
            </div>
          </div>

          {/* Player 1 Field */}
          <div className="game-field game-opponentField">
            <CardSlot
              onClick={() => {
                setPlayer1FieldIndex(0);
              }}
              card={board.player1[0]}
              active={player1FieldIndex === 0}
            ></CardSlot>

            <CardSlot
              onClick={() => setPlayer1FieldIndex(1)}
              card={board.player1[1]}
              active={player1FieldIndex === 1}
            ></CardSlot>
            <CardSlot
              onClick={() => setPlayer1FieldIndex(2)}
              card={board.player1[2]}
              active={player1FieldIndex === 2}
            ></CardSlot>
            <CardSlot
              onClick={() => setPlayer1FieldIndex(3)}
              card={board.player1[3]}
              active={player1FieldIndex === 3}
            ></CardSlot>
            <CardSlot
              onClick={() => setPlayer1FieldIndex(4)}
              card={board.player1[4]}
              active={player1FieldIndex === 4}
            ></CardSlot>
          </div>

          {/* Divider */}
          <div className="game-fieldDivider"></div>

          {/* Player 2 Field */}
          <div className="game-field game-playerField">
            <CardSlot
              onClick={() => setPlayer2FieldIndex(0)}
              card={board.player2[0]}
              active={player2FieldIndex === 0}
            ></CardSlot>
            <CardSlot
              onClick={() => setPlayer2FieldIndex(1)}
              card={board.player2[1]}
              active={player2FieldIndex === 1}
            ></CardSlot>
            <CardSlot
              onClick={() => setPlayer2FieldIndex(2)}
              card={board.player2[2]}
              active={player2FieldIndex === 2}
            ></CardSlot>
            <CardSlot
              onClick={() => setPlayer2FieldIndex(3)}
              card={board.player2[3]}
              active={player2FieldIndex === 3}
            ></CardSlot>
            <CardSlot
              onClick={() => setPlayer2FieldIndex(4)}
              card={board.player2[4]}
              active={player2FieldIndex === 4}
            ></CardSlot>
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
            <div className="mana-bar">
              <div
                className="mana-bar-fill"
                style={{ width: (1 / 1) * 100 + "%" }}
              ></div>
              <span className="mana-bar-text">
                {1}/{1}
              </span>
            </div>
          </div>

          {/* Player 2 Hand */}
          <div className="game-hand game-playerHand">
            {/* Show Join button if player 2 does not exist, else show the cards */}
            {meta?.player2 && meta?.player2 !== zeroAddress ? (
              // <div className="game-hand-cards">
              getPlayerCards(player2CardEntities).map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  onSelectCard={onSelectCardP2}
                  active={card.name === player2Card.name}
                ></Card>
              ))
            ) : (
              // </div>
              <Button onClick={() => joinPlayer2()} className="join">
                {meta?.player2 && meta?.player2 !== zeroAddress
                  ? meta?.player2
                  : "Join player 2"}
              </Button>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="game-sidebar game-rightSidebar">
          <div>
            <div>Player 1 Field Index (0 to 4): {player1FieldIndex}</div>
            <div>Player 2 Field Index (0 to 4): {player2FieldIndex}</div>

            {/* player1: "address",
        player2: "address",
        round: "uint32",
        turn: "uint8",
        started: "bool",
        start_time: "uint256",
        last_move_time: "uint256",
        winner: "address", */}
            <div>player1: {meta?.player1}</div>
            <div>player2: {meta?.player2}</div>
            <div>round: {meta?.round}</div>
            <div>turn: {meta?.turn}</div>
            <div>started: {meta?.started ? "true" : "false"}</div>
            <div>start_time: {meta?.start_time}</div>
            <div>last_move_time: {meta?.last_move_time}</div>
            <div>winner: {meta?.winner}</div>

            <Button
              onClick={() =>
                summonCard(
                  getCurrentSelectedCard().name,
                  getCurrentSelectedField()
                )
              }
            >
              Summon Card
            </Button>

            <Button
              onClick={() =>
                attack(getAttackingCard().name, getTargetCard().name)
              }
            >
              Attack
            </Button>

            <Button onClick={() => startGame()}>Start Game</Button>
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
