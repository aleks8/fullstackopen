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
  module.exports = {
    dummy,
    totalLikes,
  }