import Button from "./component/Button/index.js";
import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { Card, renderCard } from "./templates/card";
import crypto_bro_image from './public/crypto_bro.png'
import * as Controller  from "./component/Controller/index.js";

export const App = () => (
  <Controller.Controller />
)

/*
export const App = () => {
  const {
    components: { Counter },
    systemCalls: { increment },
    network: { singletonEntity },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

  return (
    <>
      <div>
        Counter: <span>{counter?.value ?? "??"}</span>
      </div>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await increment());
        }}
      >
        Increment
      </button>
    </>
  );
};
*/

/*
export const App = () => {

  let card1: Card = {
    name: "Crypto Bro",
    cost: 1,
    image: crypto_bro_image,
    ability: "Inspire 2",
    attack: 1,
    health: 1,
  }

  return (
    <div>
      Card Example:
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        {renderCard(card1)}
        {renderCard(card1)}
      </div>
    </div>
  )
};
*/