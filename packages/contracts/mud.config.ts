import { Card } from "./../client/src/templates/card";
import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    Card: {
      // Key for the card is the name / prompt
      schema: {
        attack: "uint32",
        health: "uint32",
        cost: "uint32",
        ability_type: "AbilityType",
        ability_value: "uint32",
        creator: "address",
        exists: "bool",
      },
      dataStruct: true,
    },
    Board: {
      keySchema: { player: "address", slot: "uint8" },
      schema: {
        card: "bytes32",
        attack: "uint32",
        health: "uint32",
        lastAttacked: "uint8",
      },
      dataStruct: true,
    },
    Game: {
      keySchema: {},
      schema: {
        player1: "address",
        player2: "address",
        round: "uint32",
        turn: "uint8",
        started: "bool",
        start_time: "uint256",
        last_move_time: "uint256",
        winner: "address",
      },
    },
    Owner: {
      schema: {
        creator: "address",
      },
    },
    Player: {
      keySchema: { player: "address" },
      schema: {
        health: "uint32",
        mana: "uint32",
      },
    },
  },
  enums: {
    AbilityType: ["HEAL", "AREA_ATTACK", "INSPIRE", "WEAKEN"],
    Slot: ["SLOT_1", "SLOT_2", "SLOT_3", "SLOT_4", "SLOT_5"],
  },
});
