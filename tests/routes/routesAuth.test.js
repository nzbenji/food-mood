const request = require('supertest')

jest.mock('../../server/db/users', () => ({
  registerUser: () => Promise.resolve([1]),
  getUser: () => Promise.resolve({
    username: 'billy',
    email: 'billy@hotmail.com',
    password: '$argon2id$v=19$m=8,t=2,p=1$KcGPE0x6tHXN7t3CkzXgSw$ZOvCaVGpQpAl8pBllI8Z499Qb5m3L+TAMbVELlYCtt4'
  })
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

jest.mock('../../server/auth/hash', () => ({
  verify: () => true
}))

const server = require('../../server/server')

const user = {
  username: 'billy',
  email: 'billy@hotmail.com',
  password: '1234'
}

const userSignIn = {
  username: 'billy',
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

test('signing in with correct credentials returns ok', done => {
  return request(server)
    .post('/api/v1/auth/signin')
    .send(userSignIn)
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .then(res => {
      expect(res.body.ok).toBe(true)
      expect(res.body.message).toMatch('Authentication successful.')
      done()
    })
    .catch(err => expect(err).toBeNull())
})
