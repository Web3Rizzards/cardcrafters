import "./style.css";

import * as Controller from "../../Controller";
import * as Page from "../../Page";
import * as game from "../../../data/game";

import { Has, HasValue, getComponentValueStrict } from "@latticexyz/recs";
import React, { useContext, useState } from "react";

import Button from "../../Button";
import Card from "../../Card";
import CardSlot from "../../CardSlot";
import crypto_bro_png from "../../../public/crypto_bro.png";
import { ethers } from "ethers";
import { generateTranscriptBody } from "../../../ai/generate";
import { useComponentValue } from "@latticexyz/react";
import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../../../MUDContext";
import { useRow } from "@latticexyz/react";

type Props = object;

//Zero Address
const zeroAddress = ethers.constants.AddressZero;
type TranscriptItem = {
  label: "player-1" | "player-2";
  body: string;
};

export const Play: React.FC<Props> = (props) => {
  const { controllerState, setControllerState } = useContext(
    Controller.GlobalContext
  );

  const {
    components: { Counter, Game, Card: CardComponent, Owner, Board, Metadata },
    systemCalls: {
      increment,
      createCard,
      summonCard,
      joinPlayer1,
      joinPlayer2,
      startGame,
    },
    network: { singletonEntity, playerEntity },
  } = useMUD();

  // const { world } = useMUD;
  // console.log("🚀 | world:", world);

  function getUserAddress(playerEntity: string) {
    return "0x" + playerEntity.slice(26);
  }
  console.log("🚀 | playerEntity:", playerEntity);

  Board.update$.subscribe((update) => {
    const [nextValue, prevValue] = update.value;
    console.log("Board updated", update, { nextValue, prevValue });
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

  // const [transcript, setTranstcript] = useState<TranscriptItem[]>([]);
  const [transcript, setTranstcript] = useState<TranscriptItem[]>([
    { label: "player-1", body: "Player 1 joined" },
    { label: "player-2", body: "Player 2 joined" },
  ]);

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

  function getPlayerCards(playerCardEntities: string[]): game.Card[] {
    const results = playerCardEntities.map((entity) => {
      const out = getComponentValueStrict(CardComponent, entity);
      const out2 = getComponentValueStrict(Metadata, entity);
      return { ...out, ...out2 };
    });
    console.log("🚀 | getPlayerCards | results:", results);

    return results;
  }

  function onSelectCardP1(cardName: string) {
    console.log("🚀 | onSelectCard | cardName:", cardName);
    setPlayer1Card(cardName);
  }

  function onSelectCardP2(cardName: string) {
    console.log("🚀 | onSelectCard | cardName:", cardName);
    setPlayer2Card(cardName);
  }

  // Get the Board
  const boardEntities: string[] = useEntityQuery([
    Has(Board),
    // HasValue(Owner, { creator: meta?.player1 }),
  ]);
  console.log("🚀 | boardEntities:", boardEntities);

  function getBoard(boardEntities: string[]): game.Card[] {
    const results = boardEntities.map((entity) => {
      const out = getComponentValueStrict(Board, entity);
      console.log("🚀 | results | out:", out);

      // filter player 1 cards

      const out2 = getComponentValueStrict(Metadata, entity);
      return { ...out, ...out2 };
    });

    const player1Cards = results.filter((card) => card.owner === meta?.player1);
    console.log("🚀 | results | player1Cards:", player1Cards);
    console.log("🚀 | getPlayerCards | results:", results);

    return results;
  }

  getBoard(boardEntities);

  // getPlayerCards(playerCardEntities);
  return (
    <Page.Page name="play">
      <div className="game">
        <div className="game-sidebar game-rightSidebar">
          <div className="game-sidebar-title">Battle Transcript</div>
          <div className="game-transcript">
            {transcript.map((item) => {
              switch (item.label) {
                case "player-1":
                  return (
                    <div className="game-transcript-item game-transcript-item-player1">
                      <div className="game-transcript-item-label">P1</div>
                      <div className="game-transcript-item-body">
                        {item.body}
                      </div>
                    </div>
                  );
                case "player-2":
                  return (
                    <div className="game-transcript-item game-transcript-item-player2">
                      <div className="game-transcript-item-label">P2</div>
                      <div className="game-transcript-item-body">
                        {item.body}
                      </div>
                    </div>
                  );
              }
            })}
          </div>
          <button
            onClick={async (event) => {
              event.preventDefault();
              const card: game.Card = {
                name: "Google",
                ability: { case: "Damage", amount: 1 },
                abilityDescription: "Deal 1 damage to a target",
                cost: 1,
                health: 1,
                attack: 1,
                image: crypto_bro_png,
              };
              const body = await generateTranscriptBody(card, {
                case: "card",
                card,
              });
              setTranstcript([...transcript, { label: "player-1", body }]);
            }}
          >
            test add transcript item
          </button>
        </div>
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
                  active={card.name === player1Card}
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
              id="P1-0"
              onClick={() => {
                setPlayer1FieldIndex(0);
              }}
            ></CardSlot>

            <CardSlot
              id="P1-1"
              onClick={() => setPlayer1FieldIndex(1)}
            ></CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(2)}> </CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(3)}></CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(4)}></CardSlot>
          </div>

          {/* Divider */}
          <div className="game-fieldDivider"></div>

          {/* Player 2 Field */}
          <div className="game-field game-playerField">
            <CardSlot
              onClick={() => setPlayer2FieldIndex(0)}
              card={game.exampleCard1}
              active={player2FieldIndex === 0}
            ></CardSlot>
            <CardSlot
              onClick={() => setPlayer2FieldIndex(1)}
              card={game.exampleCard1}
              active={player2FieldIndex === 1}
            ></CardSlot>
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
                  active={card.name === player2Card}
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
                summonCard(getCurrentSelectedCard(), getCurrentSelectedField())
              }
            >
              Summon Card
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
