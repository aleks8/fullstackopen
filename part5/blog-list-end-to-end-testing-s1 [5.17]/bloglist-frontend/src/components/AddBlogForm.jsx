import {useState} from 'react' 
import PropTypes from 'prop-types'

const AddBlogForm = ({
    //addBlog, 
    createBlog,
    //newTitle, 
    //handleTitleChange, 
    //newAuthor, 
    //handleAuthorChange, 
    //newUrl, 
    //handleUrlChange
  }) => {

    const [newBlog, setNewBlog] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleTitleChange = (event) => {
        //console.log('event.target.title', event.target.title)
        setNewTitle(event.target.value)
        //setNewAuthor(event.target.author)
        //setNewUrl(event.target.url)
        //setNewBlog(event.target.value)
      }
    
      const handleAuthorChange = (event) => {
        //console.log('event.target.title', event.target.title)
        //setNewTitle(event.target.title)
        setNewAuthor(event.target.value)
        //setNewUrl(event.target.url)
        //setNewBlog(event.target.value)
      }
      const handleUrlChange = (event) => {
        //console.log('event.target.title', event.target.title)
        //setNewTitle(event.target.title)
        //setNewAuthor(event.target.author)
        setNewUrl(event.target.value)
        //setNewBlog(event.target.value)
      }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor, 
            url: newUrl
        })
        
        setNewBlog('')
        //setNewTitle('')
        //setNewAuthor('')
        //setNewUrl('')
      }

    return (
    <div className="formDiv">
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      title: 
      <input 
      data-testid='title'
      value={newTitle} onChange={handleTitleChange}
      placeholder= 'write title here'
      /><br></br>
      author: 
      <input 
      data-testid='author'
      value={newAuthor} onChange={handleAuthorChange} 
      placeholder= 'write author here'
      /><br></br>
      url: 
      <input 
      data-testid='url'
      value={newUrl} onChange={handleUrlChange} 
      placeholder= 'write url here'
      /><br></br>
      <button type="submit">create</button>
    </form>  
    </div>
    )
  }

  AddBlogForm.propTypes = {
    //addBlog, 
    createBlog: PropTypes.func.isRequired,
    //newTitle: PropTypes.string.isRequired,
    //handleTitleChange: PropTypes.func.isRequired,
    //newAuthor: PropTypes.string.isRequired,
    //handleAuthorChange: PropTypes.func.isRequired,
    //newUrl: PropTypes.string.isRequired,
    //handleUrlChange: PropTypes.func.isRequired,
  }
  export default AddBlogForm