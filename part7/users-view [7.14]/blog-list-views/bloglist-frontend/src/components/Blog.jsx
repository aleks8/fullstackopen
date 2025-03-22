import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import { useUserValue } from '../UserContext';

const Blog = ({
  blog,
  blogs,
  setBlogs,
  //setErrorMessage,

  //addBlogVisible,
  //setAddBlogVisible,
  changeLikes,
  //loggedUserName,
  removeBlogMutation
}) => {
  const [addBlogVisible, setAddBlogVisible] = useState(false);
  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' };
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' };
  //const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  //const loggedUser = JSON.parse(loggedUserJSON)
  //const loggedUserName = loggedUser.name
  //console.log('loggedUserName', loggedUserName)
  //console.log('loggedUserJSON', loggedUserJSON)
  //console.log('loggeduser', loggeduser)
  //console.log('loggeduser.name', loggeduser.name)

  //part of 7.13 answer 
  const userValue = useUserValue()
  const loggedUserName = userValue.name

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  /*useEffect(() => {
      blogService.getAll().then(blogs =>
        setAllBlogs( blogs )
      )
    }, [])*/

  const deleteBlog = async blog => {
    if (
      window.confirm('Remove blog ' + blog.title + ' by ' + blog.author + '?')
    ) {
      console.log('deleted blog:' + { blog });

      //part of 7.12 answer
      removeBlogMutation.mutate(blog.id)
   /*   blogService.remove(blog.id).then(remainingBlogs => {
        remainingBlogs = blogs.filter(b => b.id !== blog.id);
        setBlogs(remainingBlogs);
      });
    */
    }
  };
  /*
   */
  if (addBlogVisible === false) {
    return (
      <div style={blogStyle} className="blog">
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setAddBlogVisible(true)}>view</button>
        </div>
      </div>
    );
  }
  /*{blog.user.name === loggeduser.name ? <button onClick={() => deleteBlog(blog)}>remove</button> :
        ''}loggedUserName*/

  /*

  {blog.user!== null ? blog.user.name === loggedUserName ? (
          <button onClick={() => deleteBlog(blog)}>remove</button>
        ) : (
          ''
        ):''}
  */
  return (
    <div style={blogStyle}>
      <div>
        <div style={showWhenVisible}>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setAddBlogVisible(false)}>hide</button>
          <br></br>
          {blog.url} <br></br>
          likes {blog.likes} <button onClick={changeLikes}>like</button>
          <br></br>
        </div>
        {blog.user === null ? 'undefined' : blog.user.name} <br></br>
        {blog.user!== null ? blog.user.name === loggedUserName ? (
          <button onClick={() => deleteBlog(blog)}>remove</button>
        ) : (
          ''
        ):''}
      </div>
    </div>
  );
};

export default Blog;

/*
  const deleteUser = (person, props) => () => {
    //console.log('hello', person.id)
    //console.log('hello', props)
    //console.log('remPeople', props.persons.filter((x) => x.id !== person.id))
    if (window.confirm('Delete '+person.name+' ?')) {

          //console.log('id',person.id)
          //console.log('props',person)
          props.personService
              .remove(person.id)
              .then(remPeople => {
                //console.log(notRemovedPeople)
                //console.log('promise fulfilled 1') 
                remPeople = props.people.filter((x) => x.id !== person.id)
                props.setPeople(remPeople)
                  
          
              })
          }
      
  }*/
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
//{blog.user.name}
