import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

//part of 6.14 answer 
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

//6.15 answer
const createNew = async (content) => {  
    const object = { content, votes: 0 }  
    const response = await axios.post(baseUrl, object)  
    return response.data
}

export default { getAll, createNew }