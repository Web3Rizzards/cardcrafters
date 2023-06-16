import { shuffled } from "ethers/lib/utils";
import * as game from "../data/game";
import createTextCompletion from "./generate_text";
// import createImage from "./generate_image";
import crypto_bro_png from '../public/crypto_bro.png'

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
    await queueCardGeneration(["control", "skill", "support"], 'skill', random(3, 2), random(4, 3))
    await queueCardGeneration(["powerful", "leader", "special"], 'special', random(2, 1), random(2, 1));
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

export const nameIgnoreRegExp: RegExp = /(\.|"|')/

export async function generateCard(prompt: CardPrompt): Promise<game.Card> {
  const prelude = `You are a deckbuilding game designer.\n\n`;

  const attributesList = prompt.attributes
    .map((attr) => `"${attr}"`)
    .join(", ");

  let name = await createTextCompletion(
    prelude +
    `Write the name of a new character with theme "${prompt.theme}" and attributes ${attributesList}. Reply with ONLY the character's name as JUST a single phrase.`
  )

  console.log("name:", name)
  name = name
    .replaceAll("\"", "")
    .replaceAll("'", "")
    .replaceAll(".", "")
  console.log("name:", name)
  if (name.length > 20) {
    name = await createTextCompletion(
      prelude +
      `Extract JUST the character name from the following description: "${name}". Reply with ONLY the character's name as JUST a single phrase.`
    )
  }
  console.log("name:", name)

  // const abilityString = await ;
  // TODO: randomly choose ability based on attributes
  const ability = await generateAbility(prompt.abilityType)

  const abilityDescription = await createTextCompletion(
    prelude +
    `Write the thematic vivid exciting description of the character "${name}" with the theme "${prompt.theme}", attributes ${attributesList}, ${attackQuality(prompt.attack)}, and ${healthQuality(prompt.health)}. Reply with ONLY the one-sentence character description.`
  )

  const imagePrompt = await createTextCompletion(
    prelude +
    `Write a vivid one-sentence description of the character art for the character "${name}" with theme "${prompt.theme}", attributes ${attributesList}, and character descriptio "${abilityDescription}".`
  );

  // const image = await createImage(`${imagePrompt}\n\nfantasy art, character profile, illustration, trending on ArtStation, no AI`);
  const image = crypto_bro_png

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

function attackQuality(attack: number): string {
  if (attack < 2)
    return "weak attack"
  else if (2 <= attack && attack < 4)
    return "moderate attack"
  else
    return "strong attack"
}

function healthQuality(health: number): string {
  if (health < 2)
    return "low health"
  else if (2 <= health && health < 4)
    return "moderate health"
  else
    return "high health"
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
