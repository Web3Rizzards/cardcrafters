import React, { useContext, useState } from 'react';
import './style.css'
import * as Page from '../../Page'
import * as Card from '../../Card'
import * as Controller from '../../Controller'
import { LoadingAnimation } from '../../LoadingAnimation';
import { generateDeck } from '../../../ai/generate';
import { sleep } from '@latticexyz/utils';
import * as game from '../../../data/game'
import * as CardLoadingAnimation from '../../CardLoadingAnimation'

const max_prompt_length = 200

type Props = {}

type Stage
  = { case: 'awaiting input' }
  | { case: 'generating' }
  | { case: 'generated' }

export const Create: React.FC<Props> = (props) => {
  const { controllerState, setControllerState } = useContext(Controller.GlobalContext)

  const [stage, setStage] = useState<Stage>({ case: 'awaiting input' })
  const [prompt, setPrompt] = useState<string>("")


  const cardsRef: game.Card[] = []
  const [cards, setCards] = useState<game.Card[]>(cardsRef)

  const forceUpdate = useForceUpdate()

  return (
    <Page.Page name="create">
      <div className='create-page-inner'>
        <button onClick={event => {
          console.log("go to page: menu")
          setControllerState(Controller.setPage('menu')(controllerState))
        }}>Menu</button>

        <h2>AI-Powered Deck Generator</h2>

        {(() => {
          switch (stage.case) {
            case 'awaiting input': return (
              <div className='create-form'>
                <div>Describe a theme, and the AI will generate a deck of cards that are inspired by it.</div>
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
                  onClick={async (event) => {
                    setStage({ case: 'generating' })
                    await generateDeck({ theme: prompt, },
                      card => {
                        console.log(`Generated card: ${card.name}`)
                        cardsRef.push(card)
                        console.log(cardsRef.length)
                        setCards(cardsRef)
                        forceUpdate()
                      })
                    setStage({ case: 'generated' })
                  }}
                >Submit</button>
              </div>
            )
            case 'generating': return (
              <div className='create-generating'>
                <p>Generating a deck with the theme:</p>
                <p className='create-generating-theme'>{prompt}</p>
                <div className='create-cards'>{[...cards.map((card, i) => (<Card.Card key={i} card={card}></Card.Card>)), <CardLoadingAnimation.CardLoadingAnimation />]}</div>
              </div>
            )
            case 'generated': return (
              <div className='create-cards'>{cards.map((card, i) => (<Card.Card key={i} card={card}></Card.Card>))}</div>
              // <div className='create-cards'>{[...cards.map((card, i) => (<Card.Card key={i} card={card}></Card.Card>)), <CardLoadingAnimation.CardLoadingAnimation />]}</div>
            )
          }
        })()}
      </div>
    </Page.Page >
  )
}

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}