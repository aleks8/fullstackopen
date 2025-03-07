const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': 
    //the below 2 lines are the 2 lines I added to answer 6.1
      const {good, ...rest} = state
      return {good: state.good + 1, ...rest}
    case 'OK':
    //6.2 answer
      const {ok, ...restok} = state
      return {ok: state.ok + 1, ...restok}
      //return state
    case 'BAD':
    //6.2 answer
      const {bad, ...restbad} = state
      return {bad: state.bad + 1, ...restbad}
      //return state
    case 'ZERO':
    //6.2 answer
      return {good: 0, ok: 0, bad: 0}
      //return state
    default: return state
  }
  
}

export default counterReducer

//console.log('good', good)
      //console.log('rest', rest)
      //const good = state.good + 1 
      //const newState = {good, ...rest}
      //console.log('newState', newState)
      //console.log('action', action)
      //console.log('state', state)
      //console.log('state, [...state, action.payload])
      //console.log('state2', [state.good+1, state.ok, state.bad])
      //state.good = state.good + 1