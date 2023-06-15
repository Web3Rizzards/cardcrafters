import React, { useContext } from 'react'
import './style.css'
import * as Page from '../../Page'
import * as Controller from '../../Controller'
import * as Card from '../../Card'
import * as game from '../../../data/game'

type Props = {

}

export const Play: React.FC<Props> = (props) => {
  let { controllerState, setControllerState } = useContext(Controller.GlobalContext)

  return (
    <Page.Page name="play">
      {/* <button onClick={event => {
        console.log("go to page: menu")
        setControllerState(Controller.setPage('menu')(controllerState))
      }}>Menu</button> */}

      {/* <div>This is the "play" page</div> */}
      <div className='game'>
        <div className='game-sidebar game-leftSidebar'>
          <div><b>Left Sidebar</b></div>
          <div>Available cards</div>
        </div>
        <div className='game-center'>

          {/* Opponent's hand */}
          <div className='game-hand game-opponentHand'>
            <Card.Card card={game.exampleCard1}></Card.Card>
            <Card.Card card={game.exampleCard1}></Card.Card>
          </div>

          {/* Opponent's field */}
          <div className='game-field game-opponentField'>
            <Card.Card card={game.exampleCard1}></Card.Card>
            <Card.Card card={game.exampleCard1}></Card.Card>
          </div>
          <div className='game-fieldDivider'></div>

          {/* Player's field */}
          <div className='game-field game-playerField'>
            <Card.Card card={game.exampleCard1}></Card.Card>
            <Card.Card card={game.exampleCard1}></Card.Card>
          </div>

          {/* Player's hand */}
          <div className='game-hand game-playerHand'>
            <Card.Card card={game.exampleCard1}></Card.Card>
            <Card.Card card={game.exampleCard1}></Card.Card>
          </div>
        </div>
        <div className='game-sidebar game-rightSidebar'>
          <div><b>Right Sidebar</b></div>
          <button>Join Player 1</button>
          <button>Join Player 2</button>
          <button>Forfeit</button>
          <button>Claim Victory</button>
          <button>Attack</button>
          <button>End Turn</button>
        </div>
      </div>
    </Page.Page >
  )
}
