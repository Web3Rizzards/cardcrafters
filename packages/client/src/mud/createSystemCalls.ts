import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { awaitStreamValue } from "@latticexyz/utils";
import { getComponentValue } from "@latticexyz/recs";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter, Game }: ClientComponents
) {
  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const createCard = async (
    cardName: string,
    attack: number,
    health: number,
    cost: number,
    ability: number,
    abilityValue: number,
    description: string,
    image: string // BASE 64
  ) => {
    // string memory cardName,
    // uint32 attack,
    // uint32 health,
    // uint32 cost,
    // AbilityType abilityType,
    // uint32 abilityValue
    const tx = await worldSend("createCard", [
      cardName,
      "description", // TODO
      // "image", //TODO
      image,
      attack,
      health,
      cost,
      ability,
      abilityValue,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const summonCard = async (cardName: string, cardSlot: number) => {
    const tx = await worldSend("summonCard", [cardName, cardSlot]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const joinPlayer1 = async () => {
    const tx = await worldSend("joinPlayer1", []);
    console.log("🚀 | joinPlayer1 | tx:", tx);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const joinPlayer2 = async () => {
    const tx = await worldSend("joinPlayer2", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  // end turn
  const endTurn = async () => {
    const tx = await worldSend("endTurn", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  // forfeit
  const forfeit = async () => {
    const tx = await worldSend("forfeit", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  // attack
  const attack = async (attackingCard: string, targetCard: string) => {
    const tx = await worldSend("attackCard", [attackingCard, targetCard]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  // attackPlayer
  // boardId = selected player's card
  const attackPlayer = async (boardId: number, opponent: `0x${string}`) => {
    const tx = await worldSend("attackPlayer", [boardId, opponent]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  // forfeitOpponent
  const forfeitOpponent = async () => {
    const tx = await worldSend("forfeitOpponent", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  //start game
  const startGame = async () => {
    const tx = await worldSend("startGame", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Game, singletonEntity);
  };

  return {
    createCard,
    increment,
    joinPlayer1,
    joinPlayer2,
    summonCard,
    endTurn,
    attack,
    attackPlayer,
    forfeit,
    forfeitOpponent,
    startGame,
  };
}
