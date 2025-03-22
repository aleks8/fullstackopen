import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import AddBlogForm from './components/AddBlogForm';
//import { usersInDb } from '../../tests/test_helper'
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {getAll, create, update, remove} from './services/blogs';
import { useNotificationDispatch } from './notificationContext';
import { useUserDispatch , useUserValue} from './UserContext';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { getAllUsers } from './services/users';

import axios from 'axios';

const App = () => {
  //const [blogs, setBlogs] = useState([]);
  const padding = {
    padding: 5
  }
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [user, setUser] = useState(null);
  //const [successMessage, setSuccessMessage] = useState(null);
  //const [errorMessage, setErrorMessage] = useState(null);
  //const [addBlogVisible, setAddBlogVisible] = useState(false)
  const blogFormRef = useRef();
  const queryClient = useQueryClient()
  
  //part of 7.11 answer
  const result = useQuery({    
    queryKey: ['blogs'],    
    queryFn: getAll//blogService.getAll()
  })  
  const resultUsers = useQuery({    
    queryKey: ['users'],    
    queryFn: getAllUsers//blogService.getAll()
  })  

  //part of 7.11 answer 
  const newBlogMutation = useMutation({ 
    mutationFn: create, 
    onSuccess: () => {      
      queryClient.invalidateQueries({ queryKey: ['blogs'] 

      }) },
  })

  //part of 7.12 answer 
  const updateBlogMutation = useMutation({
    mutationFn: update,    
    onSuccess: () => {      
      queryClient.invalidateQueries({ queryKey: ['blogs'] })    
    },
  })

  //part of 7.12 answer
  const removeBlogMutation = useMutation({
    mutationFn: remove,    
    onSuccess: () => {      
      queryClient.invalidateQueries({ queryKey: ['blogs'] })    
    },
  })

  console.log(JSON.parse(JSON.stringify(result)))

  /*if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }
*/
  const blogs = result.data

  const usersForView = resultUsers.data
  //part of 7.10 answer 
  const dispatch = useNotificationDispatch()

  //part of 7.13 answer 
  const userDispatch = useUserDispatch()
  const userValue = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      //part of 7.13 answer 
      userDispatch({type: 'SET_USER', payload: user})
      //setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  
/*  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);
*/
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

    //part of 7.11 answer 
    newBlogMutation.mutate(blogObject);
/*    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog));

      //setNewTitle('')
      //setNewAuthor('')
      //setNewUrl('')
      //setNewBlog('')
    });
*/
    //if (response !== null) {
    
    //part of 7.10 answer
    dispatch({type: "SUCCESS", payload: 'a new blog ' +
        blogObject.title.toString() +
        ' by ' +
        blogObject.author.toString() +
        ' added'})
    /*setSuccessMessage(
      'a new blog ' +
        blogObject.title.toString() +
        ' by ' +
        blogObject.author.toString() +
        ' added'
    );*/
    setTimeout(() => {
      dispatch({type: "CLEAR"})
      //setSuccessMessage(null);
    }, 5000);
    //console.log('response', response)
    //}
  };

  const handleLogin = async event => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      //this isn't going to work how I want 
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({type: 'SET_USER', payload: user})
      //setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch({type: 'ERROR', payload: 'Wrong credentials'})
      //setErrorMessage('Wrong credentials');
      setTimeout(() => {
        dispatch({type: "CLEAR"})
        //setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = event => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogappUser');
    //part of 7.13 answer 
    userDispatch({type: 'CLEAR_USER'})
    //setUser(null)
  };

  const addBlogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <AddBlogForm
            createBlog={addBlog}
            //loggedUserName={userValue.name}
           //user={userValue}
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
  if(!blogs) {
    return;
  }
  const newLikes = blog.likes + 1;
  /*const allBlogs2 = blogService.getAll().then(blogs =>
      setAllBlogs( blogs )
    )
    console.log('allblogshere',allBlogs2)*/
  //if (blogs) {
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
    console.log('newBlogObject', newBlogObject)
    /* await api
    .put('/api/blogs/{')
    .send(newBlog)*/
    //need to add pass setBlogs?
    //console.log('blog.user.name here', blog.user.name)
    //if (blogs) {
      try {
      //await 
      //part of 7.12 answer 
      updateBlogMutation.mutate({...blog, likes:newLikes})
      }
   /*   blogService
        .update(newLikesBlogId, newBlogObject)
        .then(returnedBlog => {
          setBlogs(
            blogs.map(blog =>
              blog.id !== newLikesBlogId ? blog : returnedBlog
            )
          );
        })
    */
        catch(error) {
          dispatch({type: 'ERROR', payload: `Blog '${blog.title}' was already removed from server`})
          /*setErrorMessage(
            `Blog '${blog.title}' was already removed from server`
          );*/
          setTimeout(() => {
            dispatch({type: 'CLEAR'})
            //setErrorMessage(null);
          }, 5000);
          setBlogs(blogs.filter(b => b.id !== newLikesBlogId));
        };
    //}
    //const updateBlogUser = await User.findById(newBlogObject.user)
    /*blogService.getAll().then(blogs =>
          setAllBlogs( blogs ))*/
 // }
};

  const blogList = () => (
    <div>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          //setBlogs={setBlogs}
          //addBlogVisible={addBlogVisible}
          //setAddBlogVisible={setAddBlogVisible}
          changeLikes={() => changeLikes(blog)}
          //setErrorMessage={setErrorMessage}
          //loggedUserName={userValue.name}
          removeBlogMutation={removeBlogMutation}
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

  /*
<div>
      {user === null ? (
        loginForm()
      ) : (

      )}
    </div>
  */
  
  /*
<Link style={padding} to="/notes">notes</Link>
<Route path="/notes" element={<Notes />} />
<Link style={padding} to="/users">users</Link>
<Route path="/users" element={<Users />} />
  */


  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }

  if(userValue === null) {
    return loginForm();
  }
  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        
        
      </div>
      <div>
      <h2>blogs</h2>
          <Notification />
          <form onSubmit={handleLogout}>
            <p>
              {userValue.name} logged-in <button type="submit">logout</button>
            </p>
          </form>
      </div>
      

      <Routes>
        
        <Route path="/users" element={<Users usersForView={usersForView}/>} />
        <Route path="/" element={<Home addBlogForm={()=>addBlogForm()} blogList={()=>blogList()}/>} />
      </Routes>

      <div>
        <br></br>
        <i>Blog app, Mar 2025</i>
      </div>
    </Router>
  
  );
};

const Home = ({addBlogForm, blogList}) => 
  
  (
          <div>
            
            {addBlogForm()}
            {blogList()}
          </div>
  )
  
  const Users = ({usersForView}) => {

    if(usersForView) {
      /*
    console.log('userforview', usersForView)
    console.log('userforview--name 0', usersForView[0])
    console.log('userforView--blogs', usersForView[0].blogs.length)
    */
    }
    //{usersForView.map(user => <td>{user.name}</td>)}
    //maybe try to go through the usersData here 
    return (
    <div>
      

      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {usersForView.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
        </tbody>
      </table>


     
    </div>
    )
  }

export default App;

/*
<tr>
            <td>user 1</td>
            <td># blogs user 1</td>
            <td></td>
          </tr>
          <tr>
            <td>user 2</td>
            <td># blogs user 2</td>
            <td></td>
          </tr>

           <ul>
        <li>Matti Luukkainen</li>
        <li>Juha Tauriainen</li>
        <li>Arto Hellas</li>
      </ul>
*/