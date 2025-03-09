const filterReducer = (state = 'ALL', action) => {
    
    switch (action.type) {
      case 'SET_FILTER':
        //console.log('action.payload', action.payload)
        //console.log('filter', state.anecdotes.filter(a => a.includes(action.payload) === true))
        //return state.filter(a => a.includes(action.payload) === true)
        /*filterText = action.payload.id
        //console.log('idhere', id)
        voteToChange = state.find(a => a.id === id)
        //console.log('voteToChange', voteToChange)
        changedVote = { ...voteToChange, votes: voteToChange.votes + 1 }
        //console.log('state.votes', voteToChange.votes)
        //console.log('changeVote', changedVote)
        //state.sort((a, b) => b.votes - a.votes)
        return state.map(vote =>
          vote.id !== id ? vote : changedVote 
        )*/
        return action.payload
      default:
        return state
    }
  }
  
  export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }
  
  export default filterReducer