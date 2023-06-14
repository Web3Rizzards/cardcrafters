import React, { useContext } from 'react';
import './style.css'
import * as Page from '../../Page'
import * as Controller from '../../Controller'

type Props = {

}

export const Create: React.FC<Props> = (props) => {
  let { controllerState, setControllerState } = useContext(Controller.GlobalContext)

  return (
    <Page.Page name="create">
      <button onClick={event => {
        console.log("go to page: menu")
        setControllerState(Controller.setPage('menu')(controllerState))
      }}>Menu</button>
      <div>This is the "create" page</div>
    </Page.Page >
  )
}
