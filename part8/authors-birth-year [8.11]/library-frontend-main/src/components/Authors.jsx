import { useMutation, useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = () => {
  /*if (!props.show) {
    return null
  }*/
  const [nameBorn, setNameBorn] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor, editResult] = useMutation(EDIT_AUTHOR, {
      refetchQueries: [ { query: ALL_AUTHORS } ],
      onError: (error) => {      
        const messages = error.graphQLErrors.map(e => 
          e.message).join('\n')   
        console.log('messages', messages)   
          //setError(messages)    
        }
    })  

  useEffect(() => {    
    if (editResult.data && editResult.data.editAuthor === null) {      
        //setError('person not found')    
        console.log('person not found')
    }  
  }, [editResult.data])

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  

  //const authors = []

  const submit = async (event) => {
    event.preventDefault()

    console.log('change born...')
    editAuthor({ variables: { name: nameBorn.toString(), setBornTo: parseInt(born) } })
    //createBook({  variables: { title, published, author, genres } })

    setNameBorn('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={nameBorn}
            onChange={({ target }) => setNameBorn(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
