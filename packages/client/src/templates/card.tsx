import './card.css'
import crypto_bro_image from '../public/crypto_bro.png'

export type Card = {
  name: string;
  cost: number;
  image: string;
  ability: string;
  attack: number;
  health: number;
}

export const renderCard = (card: Card): JSX.Element => (
  <div className="card">
    <div className='card-inner'>
      <div className="card-header">
        <div className="card-name">{card.name}</div>
        <div className="card-cost">{card.cost}</div>
      </div>
      <br />
      <div className="card-image">
        <img src={card.image} alt="CARD IMAGE"></img>
      </div>
      <div className="card-body">
        <div className="card-ability">{card.ability}</div>
      </div>
      <div className="card-footer">
        <div className="card-attack">{card.attack}</div>
        <div className="card-health">{card.health}</div>
      </div>
    </div>
  </div>
)

export const example1: Card = {
  name: "Crypto Bro #1",
  cost: 1,
  image: crypto_bro_image,
  ability: "Inspire 2",
  attack: 1,
  health: 1,
}

export const example2: Card = {
  name: "Crypto Bro #2",
  cost: 1,
  image: crypto_bro_image,
  ability: "Inspire 2",
  attack: 1,
  health: 1,
}