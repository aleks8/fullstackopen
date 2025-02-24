import {useState} from 'react' 
import PropTypes from 'prop-types'

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
    <div className="formDiv">
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      title: 
      <input value={newTitle} onChange={handleTitleChange}
      placeholder= 'write title here'
      /><br></br>
      author: 
      <input value={newAuthor} onChange={handleAuthorChange} 
      placeholder= 'write author here'
      /><br></br>
      url: 
      <input value={newUrl} onChange={handleUrlChange} 
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
    newTitle: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    newAuthor: PropTypes.string.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    newUrl: PropTypes.string.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
  }
  export default AddBlogForm