const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {

  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return array.reduce(reducer, 0)
}

const favoriteBlog = (array) => {

  const reducer = (max, item) => {
    return max.likes >= item.likes ? max : item
  }

  return array.reduce(reducer, array[0])
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}