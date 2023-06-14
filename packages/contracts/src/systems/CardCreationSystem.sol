// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Card } from "../codegen/Tables.sol";
import { AbilityType } from "../codegen/Types.sol";

contract CardCreationSystem is System {
  /**
   * Create a new card
   */
  function createCard(
    string memory cardName,
    uint32 attack,
    uint32 health,
    uint32 cost,
    AbilityType abilityType,
    uint32 abilityValue
  ) public {
    //TODO: https://mud.dev/store/reading-and-writing
    // Card must not exist
    // Card name must not be empty
    // Attack must be greater than 0
    // Health must be greater than 0
    // Cost must be greater than 0
    // Ability type must be valid
    // Ability value must be greater than 0
    // Cardname is hashed to form the key
  }
}
