// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Player } from "../codegen/Tables.sol";

contract GameSystem is System {
  /**
   * Join the game as player 1
   */
  function joinPlayer1() public {}

  /**
   * Join the game as player 2
   */
  function joinPlayer2() public {}

  /**
   * Start the game
   */
  function startGame() public {
    // Player 1 and Player 2 Must exist
  }

  function endTurn() public {}

  /**
   * Force opponent to lose because they did not play a turn in time
   */
  function forfeitOpponent() public {}

  /**
   * Forfeit the game
   */
  function forfeit() public {}
}
