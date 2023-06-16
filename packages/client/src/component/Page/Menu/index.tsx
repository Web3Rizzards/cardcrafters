import "./style.css";

import * as Controller from "../../Controller";
import * as Page from "../../Page";

import React, { useContext } from "react";

import Button from "../../Button";
import Section from "../../Section";

type Props = {};

export const Menu: React.FC<Props> = (props) => {
  const { controllerState, setControllerState } = useContext(
    Controller.GlobalContext
  );

  return (
    <Page.Page name="menu">
      <Section colour="#4285F4">
        <div className="title fade-in">Welcome, Craftooors!</div>
      </Section>
      <Section colour="#DB4437">
        <div className="title">Unleash Your Creativity</div>
        <div className="description">
          In a universe where "Card Crafting" is the ultimate form of art and
          competition, you are a Card Crafter, a skilled artisan who can create
          powerful cards from raw materials. In Card Craftooors, a strategic
          turn-based card game, you can create your own unique cards and use
          them to battle against other players.
        </div>
      </Section>
      <Section colour="#F4B400">
        <div className="title">Craft Your Cards</div>
        <div className="description">
          At the start of the game, you can create 5 cards by providing 5
          prompts. Each prompt can be up to 100 characters long. This limit,
          known as "Rune Energy", can be increased as you level up. Each card is
          assigned Attack Power, Health, Special Abilities, and a Summoning
          Cost.
        </div>
      </Section>
      <Section colour="#0F9D58">
        <div className="title">Engage in Strategic Battles</div>
        <div className="description">
          The playing field consists of two sides, one for each player. Each
          player has a deck of cards and a certain amount of life points. The
          objective of the game is to reduce the opponent's life points to zero.
          Each turn, you can draw a card, play a card, attack, or use a special
          ability.
        </div>
      </Section>

      <Section colour="#DB4437">
        <div className="title">Balance and Fairness</div>
        <div className="description">
          To ensure that the game is balanced and fair, attribute caps and
          summoning costs are in place. This prevents players from creating
          cards that are too powerful and forces players to think strategically
          about when to play their powerful cards.
        </div>
      </Section>
      <Section colour="#F4B400">
        <div className="title">Progress and Earn Rewards</div>
        <div className="description">
          As you win matches and gain experience, you can unlock new card
          attributes and customization options, allowing you to create even more
          powerful and unique cards. You can also earn rewards like special
          edition cards, card crafting materials, and more.
        </div>
      </Section>
      <Section colour="#0F9D58">
        <div className="title">Join the Community</div>
        <div className="description">
          Card Craftooors includes a variety of community features, such as card
          sharing, tournaments, card trading, and crafting guilds, where you can
          collaborate with other players, participate in guild battles, and
          more.
        </div>
      </Section>
      <Section colour="#FFFFFF">
        <div className="description black">
          Want to dive deeper into the world of Card Craftooors? Check out our
          detailed guides:
        </div>
        <div className="links-container">
          <a
            className="links-container-item"
            href="https://www.notion.so/More-Specific-Ideas-59ae57a5f2ff479ca11a6c54d9c2c202?pvs=21"
          >
            More Specific Ideas
          </a>
          <a
            className="links-container-item"
            href="https://www.notion.so/Card-Abilities-b310786ca35d46029007ffd829b88270?pvs=21"
          >
            Card Abilities
          </a>
          <a
            className="links-container-item"
            href="https://www.notion.so/Balancing-317d43fc73684b6c9093fde14eb288bc?pvs=21"
          >
            Balancing
          </a>
          <a
            className="links-container-item"
            href="https://www.notion.so/Decks-325b6568718f49948e881647d75a4a1b?pvs=21"
          >
            Decks
          </a>
          <a
            className="links-container-item"
            href="https://www.notion.so/User-Control-Flows-9e493114043c4613842db5f37f638103?pvs=21"
          >
            User Control Flows
          </a>
          <a
            className="links-container-item"
            href="https://www.notion.so/Prompt-9d1d4c9f5e7b4a5493f76b85c4a515a0?pvs=21"
          >
            Prompt
          </a>
          <a
            className="links-container-item"
            href="https://www.notion.so/Game-Modes-2e5f34f1b08040699d0c2900e6f181be?pvs=21"
          >
            Game Modes
          </a>
        </div>
      </Section>
    </Page.Page>
  );
};
