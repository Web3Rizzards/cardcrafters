import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    Ability: {
      keySchema: {},
      schema: {
        type: "int32",
        value: "int32",
      },
    },
    Card: {
      keySchema: {},
      schema: {
        attack: "int32",
        health: "int32",
        cost: "int32",
        ability: Ability,
      },
    },
  },
});
