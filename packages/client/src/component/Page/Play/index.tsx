import "./style.css";

import * as Controller from "../../Controller";
import * as Page from "../../Page";
import * as game from "../../../data/game";

import { Has, HasValue, getComponentValueStrict } from "@latticexyz/recs";
import React, { useContext, useState } from "react";

import Button from "../../Button";
import Card from "../../Card";
import CardSlot from "../../CardSlot";
import { ethers } from "ethers";
import { useComponentValue } from "@latticexyz/react";
import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "../../../MUDContext";
import { useRow } from "@latticexyz/react";
import { generateTranscriptBody } from "../../../ai/generate";

import crypto_bro_png from '../../../public/crypto_bro.png'

type Props = object;

type TranscriptItem = {
  label: 'player-1' | 'player-2',
  body: string
}

export const Play: React.FC<Props> = (props) => {
  const { controllerState, setControllerState } = useContext(
    Controller.GlobalContext
  );

  const {
    components: { Counter, Game, Card: CardComponent, Owner, Board },
    systemCalls: {
      increment,
      createCard,
      summonCard,
      joinPlayer1,
      joinPlayer2,
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
  const players = useComponentValue(Game, singletonEntity);

  const [name, setName] = useState("");
  const [player1FieldIndex, setPlayer1FieldIndex] = useState(0);
  const [player2FieldIndex, setPlayer2FieldIndex] = useState(0);

  const [player1Card, setPlayer1Card] = useState(0);
  const [player2Card, setPlayer2Card] = useState(0);

  // const [transcript, setTranstcript] = useState<TranscriptItem[]>([]);
  const [transcript, setTranstcript] = useState<TranscriptItem[]>([
    { label: "player-1", body: "Player 1 joined" },
    { label: "player-2", body: "Player 2 joined" },
  ]);

  // Get user addr

  const userAddr = getUserAddress(playerEntity);
  console.log("🚀 | userAddr:", userAddr);

  // Given the entity ids get player card details
  const playerCardEntities: string[] = useEntityQuery([
    Has(Owner),
    HasValue(Owner, { creator: getUserAddress(playerEntity) }),
  ]);
  console.log("🚀 | playerCardEntities:", playerCardEntities);
  function getPlayerCards(playerCardEntities: string[]): game.Card[] {
    // for (let i = 0; i < playerCardEntities.length; i++) {
    //   const entity = world.registerEntity({
    //     id: playerCardEntities[i] as EntityI,
    //   });
    //   const card = getComponentValueStrict(
    //     CardComponent,
    //     playerCardEntities[i]
    //   );
    //   console.log("🚀 | card:", card);
    // }

    const results = playerCardEntities.map((entity) =>
      getComponentValueStrict(CardComponent, entity)
    );
    console.log("🚀 | getPlayerCards | results:", results);

    return results;
  }

  getPlayerCards(playerCardEntities);
  return (
    <Page.Page name="play">
      <div className="game">
        <div className="game-sidebar game-rightSidebar">
          <div className="game-sidebar-title">Battle Transcript</div>
          <div className="game-transcript">
            {transcript.map(item => {
              switch (item.label) {
                case 'player-1': return (
                  <div className="game-transcript-item game-transcript-item-player1">
                    <div className="game-transcript-item-label">P1</div>
                    <div className="game-transcript-item-body">{item.body}</div>
                  </div>
                )
                case 'player-2': return (
                  <div className="game-transcript-item game-transcript-item-player2">
                    <div className="game-transcript-item-label">P2</div>
                    <div className="game-transcript-item-body">{item.body}</div>
                  </div>
                )
              }
            })
            }
          </div>
          <button onClick={async event => {
            event.preventDefault();
            const card: game.Card = {
              name: "Google",
              ability: { case: 'Damage', amount: 1 },
              abilityDescription: "Deal 1 damage to a target",
              cost: 1,
              health: 1,
              attack: 1,
              image: crypto_bro_png
            }
            const body = await generateTranscriptBody(card, { case: 'card', card });
            setTranstcript([...transcript, { label: 'player-1', body }])
          }}>
            test add transcript item
          </button>
        </div>
        <div className="game-center">
          {/* Player 1 Hand */}
          <div className="game-hand game-opponentHand">
            {/* Show Join button if player 1, else show the cards */}

            {players?.player1 ? (
              // <div className="game-hand-cards">
              getPlayerCards(playerCardEntities).map((card, index) => (
                <Card key={index} card={card}></Card>
              ))
            ) : (
              // </div>
              <Button onClick={() => joinPlayer1()}>
                {players?.player1 ? players?.player1 : "Join player 1"}
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
                console.log("XXX");
              }}
            ></CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(1)}></CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(2)}> </CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(3)}></CardSlot>
            <CardSlot onClick={() => setPlayer1FieldIndex(4)}></CardSlot>
          </div>

          {/* Divider */}
          <div className="game-fieldDivider"></div>

          {/* Player 2 Field */}
          <div className="game-field game-playerField">
            {/* <CardSlot onClick={() => setPlayer2FieldIndex(0)} card={game.exampleCard1}></CardSlot> */}
            <CardSlot onClick={() => setPlayer2FieldIndex(0)}></CardSlot>
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
            {/* <Card card={game.exampleCard1}></Card>
            <Card card={game.exampleCard1}></Card> */}
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
