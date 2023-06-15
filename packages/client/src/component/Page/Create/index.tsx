import React, { useContext, useState } from 'react';
import './style.css'
import * as Page from '../../Page'
import * as Controller from '../../Controller'
import { LoadingAnimation } from '../../LoadingAnimation';

const max_prompt_length = 200

type Props = {}

type Stage
  = { case: 'awaiting input' }
  | { case: 'generating' }
  | { case: 'generated' }

export const Create: React.FC<Props> = (props) => {
  let { controllerState, setControllerState } = useContext(Controller.GlobalContext)

  let [stage, setStage] = useState<Stage>({ case: 'awaiting input' })
  let [prompt, setPrompt] = useState<string>("")

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
          switch (stage.case) {
            case 'awaiting input': return (
              <div className='create-form'>
                <textarea className='create-prompt' id='create-promptTextarea'
                  placeholder="your deck's theme"
                  onChange={event => {
                    let prompt = event.target.value
                    if (prompt.length > max_prompt_length)
                      prompt = prompt.slice(0, max_prompt_length)
                    setPrompt(prompt)
                    event.target.value = prompt
                  }}
                />
                <div className='create-prompt-length-limit'>{prompt.length}/{max_prompt_length}</div>
                <button className='create-form-submit'
                  onClick={event => {
                    setStage({ case: 'generating' })
                    setTimeout(() => setStage({ case: 'generated' }), 1000)
                  }}
                >Submit</button>
              </div>
            )
            case 'generating': return (
              <div className='create-generating'>
                <p>Generating a deck with the theme:</p>
                <p className='create-generating-theme'>{prompt}</p>
                <LoadingAnimation />
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
