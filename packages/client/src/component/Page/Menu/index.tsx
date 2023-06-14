import React, { useContext } from 'react';
import './style.css'
import * as Page from '../../Page'
import * as Controller from '../../Controller'

type Props = {

}

export const Menu: React.FC<Props> = (props) => {
  let { controllerState, setControllerState } = useContext(Controller.GlobalContext)

  return (
    <Page.Page name="menu">
      <div className='menu-items'>
        <div className='menu-item'>
          <button onClick={event => {
            console.log("go to page: create")
            setControllerState(Controller.setPage('create')(controllerState))
          }}>Create</button>
        </div>
        <div className='menu-item'>
        <button onClick={event => {
            console.log("go to page: play")
            setControllerState(Controller.setPage('play')(controllerState))
          }}>Play</button>
        </div>
      </div>
    </Page.Page>
  )
}
