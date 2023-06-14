import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Card: {
      // Key for the card is the name / prompt
      schema: {
        max_attack: "uint32",
        attack: "uint32",
        max_health: "uint32",
        health: "uint32",
        cost: "uint32",
        ability_type: "AbilityType",
        ability_value: "uint32",
        creator: "address",
      },
    },
    Game: {
      keySchema: {},
      schema: {
        player1: "address",
        player2: "address",
        round: "uint32",
        turn: "uint8",
        start_time: "uint64",
      },
    },
    Player: {
      schema: {
        health: "uint32",
        mana: "uint32",
      },
    },
  },
  enums: {
    AbilityType: ["HEAL", "AREA_ATTACK", "INSPIRE", "WEAKEN"],
  },
});
