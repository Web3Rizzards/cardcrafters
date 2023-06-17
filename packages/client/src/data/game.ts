import Registry, { Id } from "./Registry";

import crypto_bro_image from "../public/crypto_bro.png";

export type Game = {
  cards: Registry<"Card", Card>;
  player1: Player;
  player2: Player;
};

export type Player = {
  deck: Id<"Card">[];
};

export type Card = {
  name: string;
  cost: number;
  image: string;
  ability: Ability;
  abilityDescription: string;
  attack: number;
  health: number;
};

export type Ability =
  | { case: "Damage"; amount: number }
  | { case: "Inspire"; amount: number }
  | { case: "Heal"; amount: number }
  | { case: "Weaken"; amount: number };

export type Board = {
  player1: {
    0: Card | null;
    1: Card | null;
    2: Card | null;
    3: Card | null;
    4: Card | null;
  };
  player2: {
    0: Card | null;
    1: Card | null;
    2: Card | null;
    3: Card | null;
    4: Card | null;
  };
};

export function showAbility(ability: Ability): string {
  switch (ability.case) {
    case "Damage":
      return `Damage all by ${ability.amount}`;
    case "Inspire":
      return `Inspire allies by ${ability.amount}`;
    case "Heal":
      return `Heal allies by ${ability.amount}`;
    case "Weaken":
      return `Weaken enemies by ${ability.amount}`;
  }
}

export const exampleAbility1: Ability = { case: "Inspire", amount: 2 };

export const exampleAbilityDescription1 =
  "Inspire people with the promised riches of cryptocurency";

export const empty_board: Board = {
  player1: { 0: null, 1: null, 2: null, 3: null, 4: null },
  player2: { 0: null, 1: null, 2: null, 3: null, 4: null },
};

export const exampleCard1: Card = {
  name: "Crypto Bro #1",
  cost: 1,
  image: crypto_bro_image,
  ability: exampleAbility1,
  abilityDescription: exampleAbilityDescription1,
  attack: 1,
  health: 1,
};
