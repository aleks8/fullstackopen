import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  //6.2 answer
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  //6.2 answer
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  //6.2 answer
  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  //6.2 answer was adding
  //onClick={ok}, onClick={bad}, onClick={reset}
  //{store.getState().ok} and {store.getState().bad}
  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
