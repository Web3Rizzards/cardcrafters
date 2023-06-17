// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Player, Game } from "../codegen/Tables.sol";

contract GameSystem is System {
  /**
   * Join the game as player 1
   */
  function joinPlayer1() public {
    require(Game.getPlayer1() == address(0), "Player 1 already exists");
    Game.setPlayer1(_msgSender());
  }

  /**
   * Join the game as player 2
   */
  function joinPlayer2() public {
    require(Game.getPlayer2() == address(0), "Player 2 already exists");
    Game.setPlayer2(_msgSender());
  }

  /**
   * Start the game
   */
  function startGame() public {
    // Player 1 and Player 2 Must exist
    address p1 = Game.getPlayer1();
    address p2 = Game.getPlayer2();

    require(p1 != address(0), "Player 1 does not exist");
    require(p2 != address(0), "Player 2 does not exist");

    // Require game to not have started
    require(!Game.getStarted(), "Game has already started");

    Game.setStarted(true);
    Game.setTurn(1);
    Game.setStart_time(block.timestamp);
    Game.setLast_move_time(block.timestamp);
  }

  function endTurn() public {
    address allowedPlayer;
    if (Game.getTurn() % 2 == 0) {
      allowedPlayer = Game.getPlayer1();
    } else {
      allowedPlayer = Game.getPlayer2();
    }

    require(allowedPlayer == _msgSender(), "Can only forfeit opponent on your opponent's turn");

    Game.setTurn(Game.getTurn() + 1);
    Game.setLast_move_time(block.timestamp);
  }

  /**
   * Force opponent to lose because they did not play a turn in time
   * OR when opponent health is 0
   */
  function forfeitOpponent() public {
    // Can only forfeit Opponent on your opponent's turn
    address allowedPlayer;
    if (Game.getTurn() % 2 == 0) {
      allowedPlayer = Game.getPlayer2();
    } else {
      allowedPlayer = Game.getPlayer1();
    }

    require(allowedPlayer == _msgSender(), "Can only forfeit opponent on your opponent's turn");

    // Can only forfeit if the opponent takes more than 1 minute
    require(block.timestamp - Game.getLast_move_time() > 60, "Opponent has not taken more than 1 minute");

    // Set opponent health to 0
    Player.setHealth(allowedPlayer, 0);
  }

  /**
   * Forfeit the game
   */
  function forfeit() public {
    // Can only forfeit if game has started
    require(Game.getStarted(), "Game has not started");

    Player.setHealth(_msgSender(), 0);
  }

  /**
   * Declare winner of the game (if either player health = 0)
   */
  function win() public {
    // Can only win if game has started
    require(Game.getStarted(), "Game has not started");

    // Can only win if player health = 0
    address p1 = Game.getPlayer1();
    address p2 = Game.getPlayer2();

    require(Player.getHealth(p1) == 0 || Player.getHealth(p2) == 0, "Player health must be 0");

    // Set game ended to true
    Game.setStarted(false);

    // Set winner
    if (Player.getHealth(p1) == 0) {
      Game.setWinner(p2);
    } else {
      Game.setWinner(p1);
    }
  }
}
