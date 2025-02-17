import {useState} from 'react' 

const AddBlogForm = ({
    //addBlog, 
    createBlog,
    newTitle, 
    handleTitleChange, 
    newAuthor, 
    handleAuthorChange, 
    newUrl, 
    handleUrlChange
  }) => {

    const [newBlog, setNewBlog] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor, 
            url: newUrl
        })
    
        setNewBlog('')
      }

    return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      title: <input value={newTitle} onChange={handleTitleChange} /><br></br>
      author: <input value={newAuthor} onChange={handleAuthorChange} /><br></br>
      url: <input value={newUrl} onChange={handleUrlChange} /><br></br>
      <button type="submit">create</button>
    </form>  
    </div>
    )
  }

  export default AddBlogForm