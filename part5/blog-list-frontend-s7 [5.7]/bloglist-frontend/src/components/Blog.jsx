import {useState} from 'react'

const Blog = ({ blog }) => {
  const [addBlogVisible, setAddBlogVisible] = useState(false)
  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  /*const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }*/
    /* <div style={hideWhenVisible}>
          <button onClick={() => setAddBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>*/
    //<button onClick={() => setAddBlogVisible(false)}>cancel</button>

  //<div style={showWhenVisible}>
  //</div>  
  //between these two can add the new information 
  //{blog.user.name}
  //{blog.title} {blog.author}
  return (
  <div style={blogStyle}>
    <div>
    
    <div style={hideWhenVisible}>
    {blog.title} {blog.author} <button onClick={() => setAddBlogVisible(true)}>view</button>
        </div>
    <div style={showWhenVisible}>
    {blog.title} {blog.author} <button onClick={() => setAddBlogVisible(false)}>hide</button>
    <br></br>
    {blog.url} <br></br>
    likes {blog.likes} <button>like</button><br></br>
    {blog.user.name}
    
    </div>  
  </div>
  </div>
)}

export default Blog