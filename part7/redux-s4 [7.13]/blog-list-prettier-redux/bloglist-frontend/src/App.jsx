import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import AddBlogForm from './components/AddBlogForm';
//import { usersInDb } from '../../tests/test_helper'
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, createBlog, udpateBlogLikes } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';
import { initializeLogin, logOutUser, setLoginUser } from './reducers/loginReducer';

const App = () => {
  //const [blogs, setBlogs] = useState([]);
  //const [newBlog, setNewBlog] = useState('')
  //const [newTitle, setNewTitle] = useState('')
  //const [newAuthor, setNewAuthor] = useState('')
  //const [newUrl, setNewUrl] = useState('')
  //const [showAll, setShowAll] = useState(true)
  //const [successMessage, setSuccessMessage] = useState(null);
  //const [errorMessage, setErrorMessage] = useState(null);
  const blogs = useSelector(state => {
    return state.blogs
  })
  const user = useSelector(state => {
    //console.log('state.login', state.login)
    //console.log('state', state)
    return state.login
  })
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [user, setUser] = useState(null);
  const [likedBlog, setLikedBlog] = useState(false);
  const [deletedBlog, setDeletedBlog] = useState(false);
  //const [addBlogVisible, setAddBlogVisible] = useState(false)
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoginUser(user))
      //setUser(user);
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  useEffect(() => {
    if(!blogs[0] || likedBlog === true || deletedBlog === true) {
    dispatch(initializeBlogs()) 
    }
    //blogService.getAll().then(blogs => setBlogs(blogs));
  }, [blogs, likedBlog, deletedBlog]);

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility();
    //const addBlog = (event) => {
    //event.preventDefault()
    /*const blogObject = {
      title: newTitle,
      author: newAuthor, 
      url: newUrl
      //important: Math.random() > 0.5,
    }*/
    //console.log('blogObject',blogObject)
    //console.log('newTitle',newTitle)
    //const response =
    console.log('usernameinaddblog', blogObject);
    
    dispatch(createBlog(blogObject))
    /*blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog));
      //setNewTitle('')
      //setNewAuthor('')
      //setNewUrl('')
      //setNewBlog('')
    });*/

    //if (response !== null) {
    dispatch(setNotification('a new blog ' +
        blogObject.title.toString() +
        ' by ' +
        blogObject.author.toString() +
        ' added', 5))
    /*setSuccessMessage(
      'a new blog ' +
        blogObject.title.toString() +
        ' by ' +
        blogObject.author.toString() +
        ' added'
    );
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);*/
    //console.log('response', response)
    //}
  };

  const handleLogin = async event => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      //is this the only place I could change it? 
      //dispatch(initializeLogin(username, password))
      //"username": "mluukkai",
    //"name": "Dan Abromov",
    //"password": "Mattipassword"
/*      const user = await loginService.login({
        username,
        password,
      });
*/
      dispatch(initializeLogin(username, password))
      //console.log('user2 - login', login)
      
      //setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5))
      /*setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);*/
    }
  };


  const handleLogout = event => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(logOutUser())
  };

  const addBlogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <AddBlogForm
            createBlog={addBlog}
            loggedUserName={user.name}
            user={user}
            //addBlog={addBlog}
            //newTitle={newTitle}
            //handleTitleChange={handleTitleChange}
            //newAuthor={newAuthor}
            //handleAuthorChange={handleAuthorChange}
            //newUrl={newUrl}
            //handleUrlChange={handleUrlChange}
          />
        </Togglable>
      </div>
    );
  };
  //
  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
  //<form onSubmit={handleLogout}>
  //<button type="submit">logout</button></form>
  //onChange={handleBlogChange}set={setNewTitle}set={setNewAuthor}set={setNewUrl}
  /*const addBlogForm = () => (
  <div>
  <h2>create new</h2>
  <form onSubmit={addBlog}>
    title: <input value={newTitle} onChange={handleTitleChange} /><br></br>
    author: <input value={newAuthor} onChange={handleAuthorChange} /><br></br>
    url: <input value={newUrl} onChange={handleUrlChange} /><br></br>
    <button type="submit">create</button>
  </form>  
  </div>
)*/

  const changeLikes = async blog => {
    const newLikes = blog.likes + 1;
    /*const allBlogs2 = blogService.getAll().then(blogs =>
        setAllBlogs( blogs )
      )
      console.log('allblogshere',allBlogs2)*/
    if (blogs) {
      console.log('blogschangelikes', blogs);
      const newLikesBlog = blogs.find(
        blogfromlist => blogfromlist.id === blog.id
      );
      const newLikesBlogId = newLikesBlog.id;
      const newLikesBlogUserId = newLikesBlog.user.id;
      /*if(newLikesBlog.user.id) {
        
        console.log('newLikesBlogUserId', newLikesBlogUserId)
      }
      else {
        const loggedUserNameId = "67a969a1a984f0ce0b582e55"
      }*/

      console.log('newLikesBlog', newLikesBlog);
      console.log('newLikesBlogUserId', newLikesBlogUserId);
      console.log('newLikesBlogId', newLikesBlogId);
      //console.log('newLikes',newLikes)newLikesBlogUserId ||
      //const newBlogObject = {...blog, likes: newLikes}
      //console.log('newBlogObject', newBlogObject)
      //console.log('newLikesBlogId', newLikesBlogId)
      const newBlogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: newLikes,
        user: blog.user.id,
      };
      /* await api
      .put('/api/blogs/{')
      .send(newBlog)*/
      //need to add pass setBlogs?
      //console.log('blog.user.name here', blog.user.name)
      if (blogs) {
         
        dispatch(udpateBlogLikes(newLikesBlogId, newBlogObject))
          .then(() => {
          setLikedBlog(true)
        })
        //dispatch(initializeBlogs())
        /*blogService
          .update(newLikesBlogId, newBlogObject)
          .then(returnedBlog => {
            setBlogs(
              blogs.map(blog =>
                blog.id !== newLikesBlogId ? blog : returnedBlog
              )
            );
          })*/
          .catch(error => {
            console.log('errorhere', error)
            dispatch(setNotification(`Blog '${blog.title}' was already removed from server`, 5))
            /*setErrorMessage(
              `Blog '${blog.title}' was already removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);*/

 /*not sure what this was for*/           
 //           setBlogs(blogs.filter(b => b.id !== newLikesBlogId));
          });
        
      }
      setLikedBlog(false) 
      
      //const updateBlogUser = await User.findById(newBlogObject.user)
      /*blogService.getAll().then(blogs =>
            setAllBlogs( blogs ))*/
    }
  };

  const blogList = () => (
    <div>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setDeletedBlog={setDeletedBlog}
          //setBlogs={setBlogs}
          //addBlogVisible={addBlogVisible}
          //setAddBlogVisible={setAddBlogVisible}
          changeLikes={() => changeLikes(blog)}
          //setErrorMessage={setErrorMessage}
          loggedUserName={user.name}
        />
      ))}
    </div>
    /*<form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  */
  );
  //{user === null && loginForm()}
  //{user !== null && noteForm()}
  //
  //<button type="submit">logout</button></p></form>
  //
  //</form>
  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <form onSubmit={handleLogout}>
            <p>
              {user.name} logged-in <button type="submit">logout</button>
            </p>
          </form>
          {addBlogForm()}
          {blogList()}
        </div>
      )}
    </div>
  );
};

export default App;
