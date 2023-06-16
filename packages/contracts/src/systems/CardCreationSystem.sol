// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Card, CardData, Owner } from "../codegen/Tables.sol";
import { AbilityType } from "../codegen/Types.sol";

// import erc721
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

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

    // Card name must not be empty
    require(bytes(cardName).length > 0, "Card name must not be empty");

    // Card must not exist
    CardData memory _card = Card.get(keccak256(bytes(cardName)));
    require(!_card.exists, "Card already exists");
    // TODO

    // Attack must be greater than 0
    require(attack > 0, "Attack must be greater than 0");
    // Health must be greater than 0
    require(health > 0, "Attack must be greater than 0");
    // Cost must be greater than 0
    require(cost > 0, "Cost must be greater than 0");

    // Attack must be less than 10
    require(attack < 10, "Attack must be less than 10");
    // Health must be less than 10
    require(health < 10, "Health must be less than 10");
    // Cost must be less than 10
    require(cost < 10, "Cost must be less than 10");

    // Ability type must be valid
    // Ability value must be greater than 0
    require(abilityValue > 0, "Ability value must be greater than 0");
    // Ability value must be less than 3
    require(abilityValue < 10, "Ability value must be less than 10");

    CardData memory card = CardData({
      attack: attack,
      health: health,
      cost: cost,
      ability_type: abilityType,
      ability_value: abilityValue,
      creator: _msgSender(),
      exists: true
    });
    // Cardname is hashed to form the key
    Card.set(keccak256(bytes(cardName)), card);
    Owner.set(keccak256(bytes(cardName)), _msgSender());
  }
}
