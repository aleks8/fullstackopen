import ReactDOM from 'react-dom/client'
import { createStore , combineReducers} from 'redux'
import { Provider } from 'react-redux'
import App from './App'
//import { createAnecdote } from './reducers/anecdoteReducer'
//import { filterChange } from './reducers/filterReducer'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer, 
  filter: filterReducer
})
const store = createStore(reducer)

//store.subscribe(() => console.log(store.getState()))
//store.dispatch(filterChange('hurts'))
//store.dispatch(createAnecdote('It only works on my machine...'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)