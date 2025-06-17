import { useMutation, useQuery } from "@apollo/client"
import { useState, useEffect } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from "react-select"
import Notify from "./Notify"

const Authors = ({errorMessage}) => {
  /*if (!props.show) {
    return null
  }*/
  //const [nameBorn, setNameBorn] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

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
  /*console.log('result:', result)

  if (!result.data || !result.data.allAuthors) {
    return <div>No authors found</div>
  }
  console.log('result:', result)*/

  const authors = result.data.allAuthors
  
  
  const options = authors.map(author => ({
    value: author.id,
    label: author.name
  }))

  //const authors = []

  const submit = async (event) => {
    event.preventDefault()

    console.log('change born...')
    //console.log('selectedOption', selectedOption)
    editAuthor({ variables: { name: selectedOption.label.toString(), setBornTo: parseInt(born) } })
    //createBook({  variables: { title, published, author, genres } })

    //setNameBorn('')
    setBorn('')
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
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
        <div className="SelectedName">
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
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

/*
<div>
          name
          <input
            value={nameBorn}
            onChange={({ target }) => setNameBorn(target.value)}
          />
        </div>

const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
*/