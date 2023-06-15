import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { awaitStreamValue } from "@latticexyz/utils";
import { getComponentValue } from "@latticexyz/recs";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter }: ClientComponents
) {
  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const createCard = async (cardName: string) => {
    const tx = await worldSend("createCard", [cardName, 1, 1, 1, 0, 1]);
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
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const joinPlayer2 = async () => {
    const tx = await worldSend("joinPlayer2", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };
  return {
    createCard,
    increment,
    joinPlayer1,
    joinPlayer2,
    summonCard,
  };
}
