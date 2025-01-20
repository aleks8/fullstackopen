const dummy = (blogs) => {
    // ...
    return 1
  }

const totalLikes = (array) => {
    //maybe add a reducer here? 
    const total = array.reduce(
      (accumulator, currentValue) => accumulator + currentValue.likes,
      0,
    )
    //console.log('total',total)
    return total
}

const favoriteBlog = (array) => {
  //const mostLikes = 0 
  if (array.length === 0) {
    return {}
  }
  else {
    const favBlogLikes = array.reduce(
      (mostLikes, currentValue) => (currentValue.likes > mostLikes)? 
      currentValue.likes : mostLikes, 
    0)
    //console.log('favBlogLikes',favBlogLikes)
    const favBlogAll = array.find((blog) => blog.likes === favBlogLikes)
    //console.log('favBlogAll',favBlogAll)
    const { title, author, likes } = favBlogAll
    const favBlog = { title, author, likes }
    //console.log('favBlog', favBlog)

    return favBlog
  }
  
  //got the right value now how do I return probably find?
}
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
  }