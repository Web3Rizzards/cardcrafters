import * as game from "../data/game";

import { random, sleep } from "@latticexyz/utils";

import createImage from "./generate_image";
import createTextCompletion from "./generate_text";
import { shuffled } from "ethers/lib/utils";

export type DeckPrompt = {
  theme: string;
};

async function generateDeckCardNames(prompt: DeckPrompt): Promise<string[]> {
  return [
    "Crypto Bro",
    "Avatar",
    "NFT",
    "DAO",
    "DeFi",
    "Yield Farming",
    "Liquidity Pool",
    "Staking",
    "Governance",
    "Smart Contract",
  ];
}

export async function generateDeck(
  prompt: DeckPrompt,
  onGenerateCard?: (card: game.Card) => void
): Promise<game.Card[]> {
  console.log("[generate] starting to generate deck");

  const cards: game.Card[] = [];
  const promises: Promise<void>[] = [];

  async function queueCardGeneration(
    name: string,
    attributes: string[],
    abilityType: "offensive" | "defensive" | "skill" | "special",
    attack: number,
    health: number
  ): Promise<void> {
    async function makeCard(): Promise<void> {
      console.log("starting to generate card");
      const card = await generateCard({
        theme: prompt.theme,
        name,
        attributes,
        abilityType,
        attack,
        health,
      });
      console.log(`finished generating card: ${card.name}`);
      cards.push(card);
      if (onGenerateCard !== undefined) onGenerateCard(card);
    }
    await sleep(100);
    promises.push(makeCard());
  }

  const names = await generateDeckCardNames(prompt);
  let nameIx = 0;
  function nextName(): string {
    return names[nameIx++];
  }

  if (true) {
    await queueCardGeneration(nextName(), ["offensive"], 'offensive', random(5, 2), random(4, 1))
    await queueCardGeneration(nextName(), ["defensive"], 'defensive', random(5, 2), random(4, 1))
    await queueCardGeneration(nextName(), ["control", "skill", "support"], 'skill', random(3, 2), random(4, 3))
    await queueCardGeneration(nextName(), ["powerful", "leader", "special"], 'special', random(2, 1), random(2, 1));
  } else {
    // offensive cards
    for (let i = 0; i < 4; i++) {
      await queueCardGeneration(
        nextName(),
        ["offensive"],
        "offensive",
        random(5, 2),
        random(4, 1)
      );
    }

    // defensive cards
    for (let i = 0; i < 4; i++) {
      await queueCardGeneration(
        nextName(),
        ["defensive"],
        "defensive",
        random(3, 1),
        random(7, 4)
      );
    }

    // skill cards
    for (let i = 0; i < 4; i++) {
      await queueCardGeneration(
        nextName(),
        ["control", "skill", "support"],
        "offensive",
        random(3, 2),
        random(4, 3)
      );
    }

    // special cards
    for (let i = 0; i < 2; i++) {
      await queueCardGeneration(
        nextName(),
        ["powerful", "leader", "special"],
        "offensive",
        random(2, 1),
        random(2, 1)
      );
    }
  }

  await Promise.all(promises);

  console.log("[generate] finished generating deck");
  return cards;
}

type AbilityType = "offensive" | "defensive" | "skill" | "special";

export type CardPrompt = {
  theme: string;
  name: string;
  attributes: string[];
  abilityType: AbilityType;
  attack: number;
  health: number;
};

export const nameIgnoreRegExp: RegExp = /(\.|"|')/;

export async function generateCard(prompt: CardPrompt): Promise<game.Card> {
  const prelude = `You are a deckbuilding game designer.\n\n`;

  const attributesList = prompt.attributes
    .map((attr) => `"${attr}"`)
    .join(", ");

  // let name = await createTextCompletion(
  //   prelude +
  //   `Write the name of a new character with theme "${prompt.theme}" and attributes ${attributesList}. Reply with ONLY the character's name as JUST a single phrase.`
  // )

  // console.log("name:", name)
  const name = prompt.name
    .trim()
    .replaceAll("\"", "")
    .replaceAll("'", "")
    .replaceAll(".", "")
    .replaceAll("*", "")
    .replaceAll("_", "")

  // console.log("name:", name)
  // if (name.length > 20) {
  //   name = await createTextCompletion(
  //     prelude +
  //     `Extract JUST the character name from the following description: "${name}". Reply with ONLY the character's name as JUST a single phrase.`
  //   )
  // }
  // console.log("name:", name)

  // const abilityString = await ;
  // TODO: randomly choose ability based on attributes
  const ability = await generateAbility(prompt.abilityType);

  const abilityDescription = await createTextCompletion(
    prelude +
      `Write the thematic vivid exciting description of the character "${name}" with the theme "${
        prompt.theme
      }", attributes ${attributesList}, ${attackQuality(
        prompt.attack
      )}, and ${healthQuality(
        prompt.health
      )}. Reply with ONLY the one-sentence character description.`
  );

  const imagePrompt = await createTextCompletion(
    prelude +
      `Write a vivid one-sentence description of the character art for the character "${name}" with theme "${prompt.theme}", attributes ${attributesList}, and character descriptio "${abilityDescription}".`
  );

  const image = await createImage({
    name,
    description: `${imagePrompt}\n\nhigh quality, high definition, fantasy art, character profile, illustration, trending on ArtStation`
  })

  return balance({
    name: `${name}-${random(1000, 100)}`,
    cost: -1,
    image: image,
    ability,
    description: abilityDescription,
    attack: prompt.attack,
    health: prompt.health,
  });
}

function attackQuality(attack: number): string {
  if (attack < 2) return "weak attack";
  else if (2 <= attack && attack < 4) return "moderate attack";
  else return "strong attack";
}

function healthQuality(health: number): string {
  if (health < 2) return "low health";
  else if (2 <= health && health < 4) return "moderate health";
  else return "high health";
}

async function generateAbility(type: AbilityType): Promise<game.Ability> {
  switch (type) {
    case "offensive":
      return shuffled([
        { case: "Damage", amount: random(5, 2) },
        { case: "Inspire", amount: random(5, 2) },
      ])[0];
    case "defensive":
      return shuffled([
        { case: "Heal", amount: random(5, 2) },
        { case: "Weaken", amount: random(5, 2) },
      ])[0];
    case "skill":
      return shuffled([
        { case: "Damage", amount: random(5, 2) },
        { case: "Heal", amount: random(5, 2) },
        { case: "Weaken", amount: random(5, 2) },
      ])[0];
    case "special":
      return shuffled([
        { case: "Damage", amount: random(5, 2) },
        { case: "Inspire", amount: random(5, 2) },
        { case: "Heal", amount: random(5, 2) },
        { case: "Weaken", amount: random(5, 2) },
      ])[0];
  }
}

async function generateDeckCardNames(prompt: DeckPrompt): Promise<string[]> {
  const prelude = `You are a deckbuilding game designer.\n\n`;

  const namesListString = await createTextCompletion(
    prelude +
    `Write a bulleted list of character names that are related to the theme "${prompt.theme}". Reply with ONLY the bulleted list.`
  )

  const namesList = namesListString.split("\n").map(_line => {
    let line = _line.trim()
    line = removePrefix(line, "-")
    line = removePrefix(line, "•")
    line = removePrefix(line, "*")
    line = removeSuffix(line, ",")
    line = removeSuffix(line, ";")
    return line
  })

  return namesList
}

function removePrefix(str: string, prefix: string): string {
  if (str.startsWith(prefix)) {
    return str.slice(prefix.length);
  }
  return str;
}

function removeSuffix(str: string, suffix: string): string {
  if (str.endsWith(suffix)) {
    return str.slice(0, str.length - suffix.length);
  }
  return str;
}


function balance(card: game.Card): game.Card {
  // throw new Error('TODO: balance')

  card.cost = Math.floor(card.attack / 2 + card.health / 3);

  // calculate the cost of the card based on its ability and attack/health
  return card;
}

type GameActionTarget
  = { case: 'card', card: game.Card }
  | { case: 'player' }
  | { case: 'summon' }


export async function generateTranscriptBody(card1: game.Card, target: GameActionTarget): Promise<string> {
  switch (target.case) {
    // case 'card': return await createTextCompletion(`Write a one-sentence vivid exciting dramatic description of the epic battle between your character, ${card1.name}, and the enemy character, ${target.card.name}. ${card1.name} has the ability ${card1.abilityDescription}. ${target.card.name} has the ability ${target.card.abilityDescription}.\n\nReply with ONLY the one-sentence description.`)
    case 'card': {
      const card2 = target.card
      const card1WillKill = card1.attack >= card2.health
      const card2WillKill = card1.attack >= card2.health
    }
    case 'player': return await createTextCompletion(`Write a one-sentence vivid exciting dramatic description of how your character, ${card1.name} attacks the enemy player. ${card1.name} has the ability ${card1.description}.\n\nReply with ONLY the one-sentence description.`)
    case 'summon': return await createTextCompletion(`Write a one-sentence vivid exciting dramatic description of how your character, ${card1.name}, enters the arena.\n\nReply with ONLY the one-sentence description.`)
  }
}
