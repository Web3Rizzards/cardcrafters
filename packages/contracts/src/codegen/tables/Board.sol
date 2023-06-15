// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

// Import schema type
import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { PackedCounter, PackedCounterLib } from "@latticexyz/store/src/PackedCounter.sol";

bytes32 constant _tableId = bytes32(abi.encodePacked(bytes16(""), bytes16("Board")));
bytes32 constant BoardTableId = _tableId;

struct BoardData {
  bytes32 card;
  uint32 attack;
  uint32 health;
  uint8 lastAttacked;
}

library Board {
  /** Get the table's schema */
  function getSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](4);
    _schema[0] = SchemaType.BYTES32;
    _schema[1] = SchemaType.UINT32;
    _schema[2] = SchemaType.UINT32;
    _schema[3] = SchemaType.UINT8;

    return SchemaLib.encode(_schema);
  }

  function getKeySchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](2);
    _schema[0] = SchemaType.ADDRESS;
    _schema[1] = SchemaType.UINT8;

    return SchemaLib.encode(_schema);
  }

  /** Get the table's metadata */
  function getMetadata() internal pure returns (string memory, string[] memory) {
    string[] memory _fieldNames = new string[](4);
    _fieldNames[0] = "card";
    _fieldNames[1] = "attack";
    _fieldNames[2] = "health";
    _fieldNames[3] = "lastAttacked";
    return ("Board", _fieldNames);
  }

  /** Register the table's schema */
  function registerSchema() internal {
    StoreSwitch.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Register the table's schema (using the specified store) */
  function registerSchema(IStore _store) internal {
    _store.registerSchema(_tableId, getSchema(), getKeySchema());
  }

  /** Set the table's metadata */
  function setMetadata() internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    StoreSwitch.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Set the table's metadata (using the specified store) */
  function setMetadata(IStore _store) internal {
    (string memory _tableName, string[] memory _fieldNames) = getMetadata();
    _store.setMetadata(_tableId, _tableName, _fieldNames);
  }

  /** Get card */
  function getCard(address player, uint8 slot) internal view returns (bytes32 card) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 0);
    return (Bytes.slice32(_blob, 0));
  }

  /** Get card (using the specified store) */
  function getCard(IStore _store, address player, uint8 slot) internal view returns (bytes32 card) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 0);
    return (Bytes.slice32(_blob, 0));
  }

  /** Set card */
  function setCard(address player, uint8 slot, bytes32 card) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    StoreSwitch.setField(_tableId, _keyTuple, 0, abi.encodePacked((card)));
  }

  /** Set card (using the specified store) */
  function setCard(IStore _store, address player, uint8 slot, bytes32 card) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    _store.setField(_tableId, _keyTuple, 0, abi.encodePacked((card)));
  }

  /** Get attack */
  function getAttack(address player, uint8 slot) internal view returns (uint32 attack) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 1);
    return (uint32(Bytes.slice4(_blob, 0)));
  }

  /** Get attack (using the specified store) */
  function getAttack(IStore _store, address player, uint8 slot) internal view returns (uint32 attack) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 1);
    return (uint32(Bytes.slice4(_blob, 0)));
  }

  /** Set attack */
  function setAttack(address player, uint8 slot, uint32 attack) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    StoreSwitch.setField(_tableId, _keyTuple, 1, abi.encodePacked((attack)));
  }

  /** Set attack (using the specified store) */
  function setAttack(IStore _store, address player, uint8 slot, uint32 attack) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    _store.setField(_tableId, _keyTuple, 1, abi.encodePacked((attack)));
  }

  /** Get health */
  function getHealth(address player, uint8 slot) internal view returns (uint32 health) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 2);
    return (uint32(Bytes.slice4(_blob, 0)));
  }

  /** Get health (using the specified store) */
  function getHealth(IStore _store, address player, uint8 slot) internal view returns (uint32 health) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 2);
    return (uint32(Bytes.slice4(_blob, 0)));
  }

  /** Set health */
  function setHealth(address player, uint8 slot, uint32 health) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    StoreSwitch.setField(_tableId, _keyTuple, 2, abi.encodePacked((health)));
  }

  /** Set health (using the specified store) */
  function setHealth(IStore _store, address player, uint8 slot, uint32 health) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    _store.setField(_tableId, _keyTuple, 2, abi.encodePacked((health)));
  }

  /** Get lastAttacked */
  function getLastAttacked(address player, uint8 slot) internal view returns (uint8 lastAttacked) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 3);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Get lastAttacked (using the specified store) */
  function getLastAttacked(IStore _store, address player, uint8 slot) internal view returns (uint8 lastAttacked) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    bytes memory _blob = _store.getField(_tableId, _keyTuple, 3);
    return (uint8(Bytes.slice1(_blob, 0)));
  }

  /** Set lastAttacked */
  function setLastAttacked(address player, uint8 slot, uint8 lastAttacked) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    StoreSwitch.setField(_tableId, _keyTuple, 3, abi.encodePacked((lastAttacked)));
  }

  /** Set lastAttacked (using the specified store) */
  function setLastAttacked(IStore _store, address player, uint8 slot, uint8 lastAttacked) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    _store.setField(_tableId, _keyTuple, 3, abi.encodePacked((lastAttacked)));
  }

  /** Get the full data */
  function get(address player, uint8 slot) internal view returns (BoardData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    bytes memory _blob = StoreSwitch.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Get the full data (using the specified store) */
  function get(IStore _store, address player, uint8 slot) internal view returns (BoardData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    bytes memory _blob = _store.getRecord(_tableId, _keyTuple, getSchema());
    return decode(_blob);
  }

  /** Set the full data using individual values */
  function set(address player, uint8 slot, bytes32 card, uint32 attack, uint32 health, uint8 lastAttacked) internal {
    bytes memory _data = encode(card, attack, health, lastAttacked);

    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    StoreSwitch.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using individual values (using the specified store) */
  function set(
    IStore _store,
    address player,
    uint8 slot,
    bytes32 card,
    uint32 attack,
    uint32 health,
    uint8 lastAttacked
  ) internal {
    bytes memory _data = encode(card, attack, health, lastAttacked);

    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    _store.setRecord(_tableId, _keyTuple, _data);
  }

  /** Set the full data using the data struct */
  function set(address player, uint8 slot, BoardData memory _table) internal {
    set(player, slot, _table.card, _table.attack, _table.health, _table.lastAttacked);
  }

  /** Set the full data using the data struct (using the specified store) */
  function set(IStore _store, address player, uint8 slot, BoardData memory _table) internal {
    set(_store, player, slot, _table.card, _table.attack, _table.health, _table.lastAttacked);
  }

  /** Decode the tightly packed blob using this table's schema */
  function decode(bytes memory _blob) internal pure returns (BoardData memory _table) {
    _table.card = (Bytes.slice32(_blob, 0));

    _table.attack = (uint32(Bytes.slice4(_blob, 32)));

    _table.health = (uint32(Bytes.slice4(_blob, 36)));

    _table.lastAttacked = (uint8(Bytes.slice1(_blob, 40)));
  }

  /** Tightly pack full data using this table's schema */
  function encode(bytes32 card, uint32 attack, uint32 health, uint8 lastAttacked) internal view returns (bytes memory) {
    return abi.encodePacked(card, attack, health, lastAttacked);
  }

  /** Encode keys as a bytes32 array using this table's schema */
  function encodeKeyTuple(address player, uint8 slot) internal pure returns (bytes32[] memory _keyTuple) {
    _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));
  }

  /* Delete all data for given keys */
  function deleteRecord(address player, uint8 slot) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /* Delete all data for given keys (using the specified store) */
  function deleteRecord(IStore _store, address player, uint8 slot) internal {
    bytes32[] memory _keyTuple = new bytes32[](2);
    _keyTuple[0] = bytes32(uint256(uint160(player)));
    _keyTuple[1] = bytes32(uint256(slot));

    _store.deleteRecord(_tableId, _keyTuple);
  }
}
