import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducers/reducer'
import { createStore } from 'redux'

const store = createStore(counterReducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
    console.log(store.getState().good)
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
    console.log(store.getState().good)
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
    console.log(store.getState().good)
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
    console.log(store.getState().good)
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
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



  

