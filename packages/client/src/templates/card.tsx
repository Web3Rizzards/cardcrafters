import './card.css'

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
      <br/>
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