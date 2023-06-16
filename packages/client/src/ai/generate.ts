import { shuffled } from "ethers/lib/utils";
import * as game from "../data/game";

import { createImage, createTextCompletion } from "./api";

import { random, sleep } from "@latticexyz/utils";

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
  console.log("[generate] starting to generate deck")

  const cards: game.Card[] = [];
  const promises: Promise<void>[] = []

  async function queueCardGeneration(attributes: string[], abilityType: 'offensive' | 'defensive' | 'skill' | 'special', attack: number, health: number): Promise<void> {
    async function makeCard(): Promise<void> {
      console.log("starting to generate card")
      const card = await generateCard({
        theme: prompt.theme,
        attributes,
        abilityType,
        attack,
        health
      });
      console.log(`finished generating card: ${card.name}`)
      cards.push(card)
      if (onGenerateCard !== undefined) onGenerateCard(card)
    }
    await sleep(100)
    promises.push(makeCard())
  }

  if (true) {
    await queueCardGeneration(["offensive"], 'offensive', random(5, 2), random(4, 1))
    await queueCardGeneration(["defensive"], 'defensive', random(5, 2), random(4, 1))
  } else {
    // offensive cards
    for (let i = 0; i < 4; i++) {
      await queueCardGeneration(["offensive"], 'offensive', random(5, 2), random(4, 1))
    }

    // defensive cards
    for (let i = 0; i < 4; i++) {
      await queueCardGeneration(["defensive"], 'defensive', random(3, 1), random(7, 4))
    }

    // skill cards
    for (let i = 0; i < 4; i++) {
      await queueCardGeneration(["control", "skill", "support"], 'offensive', random(3, 2), random(4, 3))
    }

    // special cards
    for (let i = 0; i < 2; i++) {
      await queueCardGeneration(["powerful", "leader", "special"], 'offensive', random(2, 1), random(2, 1));
    }
  }

  await Promise.all(promises)

  console.log("[generate] finished generating deck")
  return cards;
}

type AbilityType = 'offensive' | 'defensive' | 'skill' | 'special';

export type CardPrompt = {
  theme: string;
  attributes: string[];
  abilityType: AbilityType,
  attack: number;
  health: number;
};

export async function generateCard(prompt: CardPrompt): Promise<game.Card> {
  const prelude = `You are a deckbuilding game designer.\n\n`;

  const attributesList = prompt.attributes
    .map((attr) => `"${attr}"`)
    .join(", ");

  const name = await createTextCompletion(
    prelude +
    `Write the name of a new character with theme "${prompt.theme}" and attributes ${attributesList}. Reply with EXACTLY just the card name.`
  );

  // const abilityString = await ;
  // TODO: randomly choose ability based on attributes
  const ability = await generateAbility(prompt.abilityType)

  const abilityDescription = await createTextCompletion(
    prelude +
    `Write the thematic description of a character with the theme "${prompt.theme}", attributes ${attributesList}, and name "${name}". Reply with EXACTLY just the character description.`
  )

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


async function generateAbility(type: AbilityType): Promise<game.Ability> {
  switch (type) {
    case 'offensive': return shuffled([
      { case: 'Damage', amount: random(5, 2) },
      { case: 'Inspire', amount: random(5, 2) },
    ])[0]
    case 'defensive': return shuffled([
      { case: 'Heal', amount: random(5, 2) },
      { case: 'Weaken', amount: random(5, 2) },
    ])[0]
    case 'skill': return shuffled([
      { case: 'Damage', amount: random(5, 2) },
      { case: 'Heal', amount: random(5, 2) },
      { case: 'Weaken', amount: random(5, 2) },
    ])[0]
    case 'special': return shuffled([
      { case: 'Damage', amount: random(5, 2) },
      { case: 'Inspire', amount: random(5, 2) },
      { case: 'Heal', amount: random(5, 2) },
      { case: 'Weaken', amount: random(5, 2) },
    ])[0]
  }
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
