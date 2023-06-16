import crypto_bro_image from '../public/crypto_bro.png'
import Registry, { Id } from './Registry'

export type Game = {
  cards: Registry<'Card', Card>,
  player1: Player,
  player2: Player,
}

export type Player = {
  deck: Id<'Card'>[],
}

export type Card = {
  name: string,
  cost: number,
  image: string,
  ability: Ability,
  abilityDescription: string,
  attack: number,
  health: number,
}

export type Ability
  = { case: 'Damage', amount: number }
  | { case: 'Inspire', amount: number }
  | { case: 'Heal', amount: number }
  | { case: 'Weaken', amount: number }

export const exampleAbility1: Ability = { case: 'Inspire', amount: 2 }

export const exampleAbilityDescription1: string = "Inspire people with the promised riches of cryptocurency"

// export const exampleCard1: Card = {
//   name: "Crypto Bro #1",
//   cost: 1,
//   image: crypto_bro_image,
//   ability: exampleAbility1,
//   abilityDescription: exampleAbilityDescription1,
//   attack: 1,
//   health: 1,
// }