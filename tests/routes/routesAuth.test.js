const request = require('supertest')

jest.mock('../../server/db/users', () => ({
  registerUser: () => Promise.resolve([1])
}))

jest.mock('../../server/auth/token', () => ({
  issue: (req, res) => {
    res.json({
      ok: true,
      message: 'Authentication successful.',
      userId: 1,
      token: 'eyJhb'
    })
  }
}))

const server = require('../../server/server')

const user = {
  username: 'billy',
  email: 'billy@hotmail.com',
  password: '1234'
}

test('posting new user to /register returns token', done => {
  return request(server)
    .post('/api/v1/auth/register')
    .send(user)
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .then(res => {
      expect(res.body.ok).toBe(true)
      expect(res.body.message).toMatch('Authentication successful.')
      done()
    })
    .catch(err => expect(err).toBeNull())
})

test('posting user without username throws error', done => {
  user.username = ''
  return request(server)
    .post('/api/v1/auth/register')
    .send(user)
    .expect(500)
    .then((res) => {
      expect(res.error.text).toContain('No username provided')
      done()
    })
    .catch(err => expect(err).toBeNull())
})
