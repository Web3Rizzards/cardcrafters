import * as game from "../data/game";

import { createImage, createTextCompletion } from "./api";

import { random } from "@latticexyz/utils";

/*
A deck consists of 16 cards, which are all generated using the same _theme_, and has the following distribution of attributes:
- 6 cards are attack-focused
- 4 cards are defense-focused
- 4 cards are ability-focused
- 2 cards are special, determined by the theme
*/

export type DeckPrompt = {
  theme: string;
};

export async function generateDeck(
  prompt: DeckPrompt,
  onGenerateCard?: (card: game.Card) => void
): Promise<game.Card[]> {
  const cards: game.Card[] = [];

  async function makeCard(
    attributes: string[],
    attack: number,
    health: number
  ): Promise<void> {
    const card = await generateCard({
      theme: prompt.theme,
      attributes: attributes,
      attack: attack,
      health: health,
    });
    cards.push(card);
    if (onGenerateCard !== undefined) onGenerateCard(card);
  }

  // offensive cards
  for (let i = 0; i < 4; i++) {
    await makeCard(["offensive"], random(5, 2), random(4, 1));
  }

  // defensive cards
  for (let i = 0; i < 4; i++) {
    await makeCard(["defensive"], random(3, 1), random(7, 4));
  }

  // skill cards
  for (let i = 0; i < 4; i++) {
    await makeCard(["control", "skill", "support"], random(3, 2), random(4, 3));
  }

  // special cards
  for (let i = 0; i < 2; i++) {
    await makeCard(
      ["powerful", "leader", "special"],
      random(2, 1),
      random(2, 1)
    );
  }

  return cards;
}

export type CardPrompt = {
  theme: string;
  attributes: string[];
  attack: number;
  health: number;
};

export async function generateCard(prompt: CardPrompt): Promise<game.Card> {
  // throw new Error('TODO: generateCard')
  const prelude = `You are a deckbuilding game designer.\n\n`;

  const attributesList = prompt.attributes
    .map((attr) => `"${attr}"`)
    .join(", ");

  const name = await createTextCompletion(
    prelude +
      `Write the name of a new card with theme "${prompt.theme}" and attributes ${attributesList}`
  );

  const abilityString = await createTextCompletion(
    prelude +
      `Write the ability of a new card with the theme "${prompt.theme}", attributes ${attributesList}, and name "${name}"`
  );

  const ability = parseAbility(abilityString);

  const abilityDescription = await createTextCompletion(
    prelude +
      `Write an exciting description of the ability "${abilityString}" of the card named "${name}" with theme "${prompt.theme}"`
  );

  const imagePrompt = await createTextCompletion(
    prelude +
      `Write a vivid description of the art for a card with the theme "${prompt.theme}", attributes ${attributesList}, name "${name}", and ability "${ability}"`
  );

  const image = await createImage(imagePrompt);

  return balance({
    name: `${name}-${random(1000, 100)}`,
    cost: -1,
    imageHref: image,
    ability,
    abilityDescription,
    attack: prompt.attack,
    health: prompt.health,
  });
}

function parseAbility(abilityString: string): game.Ability {
  // throw new Error('TODO: parseAbility')

  return game.exampleAbility1;
}

function balance(card: game.Card): game.Card {
  // throw new Error('TODO: balance')
  card.cost = 1;

  // calculate the cost of the card based on its ability and attack/health
  return card;
}
