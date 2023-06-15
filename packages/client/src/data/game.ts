import crypto_bro_image from '../public/crypto_bro.png'

export type Game = {

}

export type Card = {
  name: string;
  cost: number;
  image: string;
  ability: string;
  attack: number;
  health: number;
}

export const exampleCard1: Card = {
  name: "Crypto Bro #1",
  cost: 1,
  image: crypto_bro_image,
  ability: "Inspire 2",
  attack: 1,
  health: 1,
}