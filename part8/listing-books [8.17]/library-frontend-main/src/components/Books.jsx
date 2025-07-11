import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = () => {
  /*if (!props.show) {
    return null
  }*/

  const result = useQuery(ALL_BOOKS)
    
  if (result.loading) {
      return <div>loading...</div>
  }
  
  if (!result.data || !result.data.allBooks) {
    return <div>No books found</div>
  }
  
  //console.log('result', result)
  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author ? a.author.name : null}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
