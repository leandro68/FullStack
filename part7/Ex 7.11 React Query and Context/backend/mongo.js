const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://leandro:${password}@fullstackcourse.v7gjr4s.mongodb.net/testBlogApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  const Blog = mongoose.model('Blog', noteSchema)

  const blog = new Blog({
    title: 'Blog2',
    author: 'Author2',
    url: 'url2.com',
    likes: 12
  })

  blog.save().then(result => {
    console.log('blog saved!')
    mongoose.connection.close()
  })

  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
})

