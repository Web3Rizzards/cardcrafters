import React from 'react'
import * as game from '../../data/game'
import './style.css'

type Props = {
  card: game.Card
}

export const Card: React.FC<Props> = (props) => (
  <div className="card">
    <div className='card-inner'>
      <div className="card-header">
        <div className="card-name">{props.card.name}</div>
        <div className="card-cost">{props.card.cost}</div>
      </div>
      <br />
      <div className="card-image">
        <img src={props.card.imageHref} alt="CARD IMAGE" draggable={false}></img>
      </div>
      <div className="card-body">
        <div className="card-ability">{props.card.abilityDescription}</div>
      </div>
      <div className="card-footer">
        <div className="card-attack">{props.card.attack}</div>
        <div className="card-health">{props.card.health}</div>
      </div>
    </div>
  </div>
)