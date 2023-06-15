// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Player, PlayerData, Card, CardData, BoardData, Board, Game } from "../codegen/Tables.sol";

contract AttackSystem is System {
  function summonCard(string memory cardName, uint8 boardId) public {
    bytes32 cardId = keccak256(bytes(cardName));
    CardData memory card = Card.get(cardId);

    // Must be owner of card
    require(card.creator == _msgSender(), "Must be owner of card");

    // Card slot must be empty
    require(Board.get(_msgSender(), boardId).card == bytes32(0), "Card slot must be empty");

    // Board Id must be between 0 and 4
    require(boardId >= 0 && boardId < 4, "Board Id must be between 0 and 4");

    BoardData memory _board = BoardData({ card: cardId, attack: card.attack, health: card.health, lastAttacked: 0 });
    Board.set(_msgSender(), boardId, _board);
  }

  // Targets Board
  /**
   *
   * @param boardId the boardId of the card to attack with
   * @param targetPlayer the player to attack
   * @param targetBoardId the boardId of the card to attack
   */
  function attackCard(uint8 boardId, address targetPlayer, uint8 targetBoardId) public {
    // Can only attack if it is your turn
    address allowedPlayer;

    if (Game.getTurn() % 2 == 0) {
      allowedPlayer = Game.getPlayer1();
    } else {
      allowedPlayer = Game.getPlayer2();
    }

    require(allowedPlayer == _msgSender(), "Can only attack if it is your turn");

    BoardData memory attackingCard = Board.get(_msgSender(), boardId);
    BoardData memory targetCard = Board.get(targetPlayer, targetBoardId);

    // attacking card must exist
    require(attackingCard.card.length > 0, "Attacking card must exist");

    // target card must exist
    require(targetCard.card.length > 0, "Target card must exist");

    // attacking card must have health
    require(attackingCard.health > 0, "Attacking card must be still alive");

    // target card must have health
    require(targetCard.health > 0, "Attacking card must be still alive");

    // Can only attack once
    require(attackingCard.lastAttacked != Game.getTurn(), "Can only attack once");

    if (attackingCard.attack >= targetCard.health) {
      Board.setHealth(_msgSender(), boardId, 0);
    } else {
      Board.setHealth(_msgSender(), boardId, targetCard.health - attackingCard.attack);
    }
    Board.setLastAttacked(_msgSender(), boardId, Game.getTurn());
  }

  function attackPlayer(uint8 boardId, address targetPlayer) public {
    // Can only attack if it is your turn
    address allowedPlayer;

    if (Game.getTurn() % 2 == 0) {
      allowedPlayer = Game.getPlayer1();
    } else {
      allowedPlayer = Game.getPlayer2();
    }

    require(allowedPlayer == _msgSender(), "Can only attack if it is your turn");

    BoardData memory attackingCard = Board.get(_msgSender(), boardId);
    PlayerData memory target = Player.get(targetPlayer);
    // attacking card must exist
    require(attackingCard.card.length > 0, "Attacking card must exist");

    // attacking card must have health
    require(attackingCard.health > 0, "Attacking card must be still alive");

    // Can only attack once
    require(attackingCard.lastAttacked != Game.getTurn(), "Can only attack once");

    if (attackingCard.attack >= target.health) {
      Player.setHealth(targetPlayer, 0);
    } else {
      Player.setHealth(targetPlayer, target.health - attackingCard.attack);
    }
    Board.setLastAttacked(_msgSender(), boardId, Game.getTurn());
  }
}
