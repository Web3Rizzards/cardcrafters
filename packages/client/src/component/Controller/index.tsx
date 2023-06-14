import React, { Context, useState } from 'react';
import './style.css'
import * as Menu from '../Page/Menu';
import * as Play from '../Page/Play';
import * as Create from '../Page/Create';

export type Props = {}

export type State = {
  pageKey: PageKey
}

export type PageKey = 'menu' | 'create' | 'play'

export const GlobalContext = React.createContext<{
  controllerState: State,
  setControllerState: (controllerState: State) => void
}
>({} as any)

export const setPage = (pageKey: PageKey) => (state: State): State =>
  ({ ...state, pageKey })

export const Controller: React.FC<Props> = () => {
  let [controllerState, setControllerState] = useState<State>({
    pageKey: 'menu'
  })

  return (
    <GlobalContext.Provider value={{ controllerState, setControllerState }}>
      {(() => {
        switch (controllerState.pageKey) {
          case 'menu': return (<Menu.Menu />)
          case 'create': return (<Create.Create />)
          case 'play': return (<Play.Play />)
        }
      })()}
    </GlobalContext.Provider>
  )
}
