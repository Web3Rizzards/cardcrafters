import React, { useContext, useState } from 'react';
import './style.css'
import * as Page from '../../Page'
import * as Controller from '../../Controller'

type Props = {

}

type State = {
  stage: Stage
}

type Stage
  = { case: 'awaiting input' }
  | { case: 'generating', input: string }
  | { case: 'generated' }

export const Create: React.FC<Props> = (props) => {
  let { controllerState, setControllerState } = useContext(Controller.GlobalContext)

  let [state, setState] = useState<State>({
    stage: { case: 'awaiting input' }
  })

  return (
    <Page.Page name="create">
      <div className='create-page-inner'>
        <button onClick={event => {
          console.log("go to page: menu")
          setControllerState(Controller.setPage('menu')(controllerState))
        }}>Menu</button>

        <h2>AI-Powered Deck Generator</h2>

        <p>Describe a theme, and the AI will generate a deck of cards that are inspired by it.</p>

        {(() => {
          switch (state.stage.case) {
            case 'awaiting input': return (
              <div className='create-form'>
                <textarea className='create-prompt' id='create-promptTextarea' placeholder="your deck's theme" />
                <button className='create-form-submit'
                  onClick={event => {
                    let _promptTextarea = document.getElementById('create-promptTextarea')
                    if (_promptTextarea === null) { throw new Error("promptTextarea is null") }
                    let promptTextarea: HTMLTextAreaElement = _promptTextarea as HTMLTextAreaElement
                    let value: string = promptTextarea.value
                    console.log("promptTextarea.value: ", value)
                    setState({ ...state, stage: { case: 'generating', input: value } })
                  }}
                >Submit</button>
              </div>
            )
            case 'generating': return (
              <div className='create-generating'>
                <p>Generating a deck with the theme:</p>
                <p className='create-generating-theme'>{state.stage.input}</p>
                <div className='create-generating-loading'>
                  <div className="create-generating-loading-center">
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                    <div className="create-generating-loading-wave"></div>
                  </div>
                </div>
              </div>
            )
            case 'generated': return (
              <div className='create-result'></div>
            )
          }
        })()}
      </div>
    </Page.Page >
  )
}
