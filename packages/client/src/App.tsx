// import { Card, renderCard } from "./templates/card";

// import Button from "./component/Button.tsx";
import { Controller } from "./component/Controller";
import crypto_bro_image from "./public/crypto_bro.png";
import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { useState } from "react";

export const App = () => <Controller />;

// export const App = () => {
//   const {
//     components: { Counter, Game },
//     systemCalls: {
//       increment,
//       createCard,
//       summonCard,
//       joinPlayer1,
//       joinPlayer2,
//     },
//     network: { singletonEntity },
//   } = useMUD();
//   const counter = useComponentValue(Counter, singletonEntity);
//   const players = useComponentValue(Game, singletonEntity);
//   // return (
//   //   <>
//   //     <div>
//   //       Counter: <span>{counter?.value ?? "??"}</span>
//   //     </div>
//   //     <button
//   //       type="button"
//   //       onClick={async (event) => {
//   //         event.preventDefault();
//   //         console.log("new counter value:", await increment());
//   //       }}
//   //     >
//   //       Increment
//   //     </button>
//   //   </>
//   // );
//   // let card1: Card = {
//   //   name: "Crypto Bro",
//   //   cost: 1,
//   //   image: crypto_bro_image,
//   //   ability: "Inspire 2",
//   //   attack: 1,
//   //   health: 1,
//   // }
//   // return (
//   //   <div>
//   //     Card Example:
//   //     <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
//   //       {renderCard(card1)}
//   //       {renderCard(card1)}
//   //     </div>
//   //   </div>
//   // )
//   const [name, setName] = useState("");
//   const [cardSlot, setCardSlot] = useState(0);
//   const [target, setTarget] = useState(0);
//   return (
//     <div>
//       Card Name
//       <input
//         onChange={(e) => {
//           setName(e.target.value);
//         }}
//       ></input>
//       Card Slot (0 to 4)
//       <input
//         onChange={(e) => {
//           setCardSlot(Number(e.target.value));
//         }}
//       ></input>
//       <input
//         onChange={(e) => {
//           setTarget(Number(e.target.value));
//         }}
//       ></input>
//       {/* <div>Player 1 Health:</div>
//       <div>Player 2 Health:</div>
//       <Button onClick={() => createCard(name)}>Create Card</Button>
//       <Button onClick={() => joinPlayer1()}>
//         {players?.player1 ? players?.player1 : "Join player 1"}
//       </Button>
//       <Button onClick={() => joinPlayer2()}>
//         {players?.player2 ? players?.player2 : "Join player 2"}
//       </Button>
//       <Button onClick={() => summonCard(name, Number(cardSlot))}>
//         Summon Card
//       </Button>
//       <Button onClick={() => summonCard(name, Number(cardSlot))}>
//         End Turn
//       </Button>
//       <Button onClick={() => summonCard(name, Number(cardSlot))}>
//         Forfeit
//       </Button>
//       <Button onClick={() => summonCard(name, Number(cardSlot))}>
//         Forfeit Opponent
//       </Button>
//       <Button onClick={() => summonCard(name, Number(cardSlot))}>Win</Button>
//       <Button onClick={() => summonCard(name, Number(cardSlot))}>Attack</Button>
//       <Button onClick={() => summonCard(name, Number(cardSlot))}>
//         Attack Player
//       </Button> */}
//     </div>
//   );
// };
