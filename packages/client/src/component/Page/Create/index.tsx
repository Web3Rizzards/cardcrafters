import "./style.css";

import * as CardLoadingAnimation from "../../CardLoadingAnimation";
import * as Controller from "../../Controller";
import * as Page from "../../Page";
import * as game from "../../../data/game";

import React, { useContext, useState } from "react";

import Button from "../../Button";
import Card from "../../Card";
import { LoadingAnimation } from "../../LoadingAnimation";
import { generateDeck } from "../../../ai/generate";
import { lucky } from "./lucky";
import { shuffled } from "ethers/lib/utils";
import { sleep } from "@latticexyz/utils";
import { useMUD } from "../../../MUDContext";

const max_prompt_length = 200;

type Props = {};

type Stage =
  | { case: "awaiting input" }
  | { case: "generating" }
  | { case: "generated" };

export const Create: React.FC<Props> = (props) => {
  const {
    components: { Card: CardComponent },
    systemCalls: { createCard },
    network: { singletonEntity },
  } = useMUD();

  CardComponent.update$.subscribe((update) => {
    const [nextValue, prevValue] = update.value;
  });

  const { controllerState, setControllerState } = useContext(
    Controller.GlobalContext
  );

  const [stage, setStage] = useState<Stage>({ case: "awaiting input" });
  const [prompt, setPrompt] = useState<string>("");

  const cardsRef: game.Card[] = [];
  const [cards, _setCards] = useState<game.Card[]>(cardsRef);
  const forceUpdate = useForceUpdate();

  function addCard(card: game.Card) {
    cardsRef.push(card);
    _setCards(cardsRef);
    forceUpdate();
  }

  function resetCards() {
    while (cardsRef.pop()) { }
    _setCards([]);
    forceUpdate();
  }

  const ability2Enum = (ability: string) => {
    return { Inspire: 2, Damage: 1, Heal: 0, Weaken: 3 }[ability];
  };

  async function submitThemePrompt() {
    resetCards();
    setStage({ case: "generating" });

    await generateDeck({ theme: prompt }, (card) => {
      console.log("🚀 | onClick={ | card:", card);
      createCard(
        card.name,
        card.attack,
        card.health,
        card.cost,
        ability2Enum(card.ability.case) as number,
        card.ability.amount,
        card.abilityDescription,
        card.image
      );
      console.log(`Generated card: ${card.name}`);
      addCard(card);
    });

    setStage({ case: "generated" });
  }

  return (
    <Page.Page name="create">
      <div className="create-page-inner">
        {/* <button
          onClick={(event) => {
            console.log("go to page: menu");
            setControllerState(Controller.setPage("menu")(controllerState));
          }}
        >
          Menu
        </button> */}

        {/* <h2>AI-Powered Deck Generator</h2> */}

        <img src="./src/public/craftooors.svg"></img>

        <div className="create-form">
          <div className="create-prompt">
            {/* <span className="create-prompt-prefix">🀛</span> */}
            <span className="create-prompt-prefix">
              <div style={{ display: "inline-block" }}>🃏</div>
            </span>
            <input
              id="create-promptInput"
              // placeholder="Describe a theme, and the AI will generate a deck of cards that are inspired by it..."
              placeholder="Your deck theme"
              autoFocus={true}
              onChange={(event) => {
                let prompt = event.target.value;
                if (prompt.length > max_prompt_length)
                  prompt = prompt.slice(0, max_prompt_length);
                setPrompt(prompt);
                event.target.value = prompt;
              }}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  submitThemePrompt()
                }
              }}
            />
          </div>
          {/* <div className="create-prompt-length-limit">
                    {prompt.length}/{max_prompt_length}
                  </div> */}
          <div className="create-button-container">
            <Button
              onClick={event => submitThemePrompt()}
            >
              Submit
            </Button>
            <Button
              onClick={async (event) => {
                const input = document.getElementById(
                  "create-promptInput"
                ) as HTMLTextAreaElement;
                const value = shuffled(lucky)[0];
                input.value = value;
                setPrompt(value);
              }}
            >
              {"I'm Feeling Lucky"}
            </Button>
          </div>
        </div>

        {(() => {
          switch (stage.case) {
            case "awaiting input":
              return;
            case "generating":
              return (
                <div className="create-generating">
                  <div className="create-cards">
                    {[
                      ...cards.map((card, i) => (
                        <Card key={i} card={card}></Card>
                      )),
                      <CardLoadingAnimation.CardLoadingAnimation key="loading" />,
                    ]}
                  </div>
                </div>
              );
            case "generated":
              return (
                <div className="create-cards">
                  {cards.map((card, i) => (
                    <Card key={i} card={card}></Card>
                  ))}
                </div>
                // <div className='create-cards'>{[...cards.map((card, i) => (<Card key={i} card={card}></Card>)), <CardLoadingAnimation.CardLoadingAnimation />]}</div>
              );
          }
        })()}
      </div>
    </Page.Page>
  );
};

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here
  // is better than directly setting `setValue(value + 1)`
}
