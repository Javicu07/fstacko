const { beforeEach } = require('node:test')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { api } = require('./helpers')
const moongose = require('moongose')
const { server } = require('../index')

// 'describe' agroup the tests
describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)

    const user = new User({ username: 'miduroot', passwordHash })

    await user.save()
  })

  test('work as expected creating a fresh username', async () => {
    const usersDB = await User.find({})
    const usersAtStart = usersDB.map(user => user.toJSON())

    const newUser = {
      username: 'midudev',
      name: 'Miguel',
      password: 'tw1tch'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersDBAfter = await User.find({})
    const usersAtEnd = usersDBAfter.map(user => user.toJSON())

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  afterAll(() => {
    moongose.connection.close()
    server.close()
  })
})
