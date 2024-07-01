const usersRouter = require('express').Router()
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

usersRouter.post('/', async (request, response) => {
  if (request.body.password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters' })
  } else {
    const { username, name, password } = request.body
    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter