const testEnv = require('./test-environment')
const db = require('../../server/db/users')

let testDb = null

const user = {
  username: 'billy',
  email: 'billy@hotmail.com',
  password: '1234'
}

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('registerUser registers a new user', () => {
  const expectedId = 1
  
  return db
    .registerUser(user, testDb)
    .then(user => {
      const actualId = user[0]
      expect(actualId).toBe(expectedId)
    })
    .catch(err => expect(err).toBeNull())
})

test('registerUser does not re-register same user', () => {
  const expectedError = 'UNIQUE constraint failed: users.username'
  return db
    .registerUser(user, testDb)
    .then(() => {
      db.registerUser(user, testDb).catch(err => {
        const actualError = err.message
        const containing = actualError.includes(expectedError)
        expect(containing).toBe(true)
      })
    })
    .catch(err => expect(err).toBeNull())
})

test('registerUser has unique id', () => {
  const user2 = {
    username: 'sammy',
    email: 'sammy@hotmail.com',
    password: '1234'
  }
  return db
    .registerUser(user, testDb)
    .then(res1 => {
      db.registerUser(user2, testDb).then(res2 => {
        expect(res1[0]).not.toBe(res2[0])
      })
    })
    .catch(err => expect(err).toBeNull())
})

test('registerUser hashes password', () => {
  return db
    .registerUser(user, testDb)
    .then(() => {
      db.getUser(user, testDb)
        .then(data => {
          expect(user.password).not.toBe(data.hash)
        })
        .catch(err => expect(err).toBeNull())
    })
    .catch(err => expect(err).toBeNull())
})

test('getUser returns user with correct username', () => {
  return db
    .registerUser(user, testDb)
    .then(() => {
      db.getUser(user, testDb)
        .then(data => {
          expect(user.email).toMatch(data.email)
          expect(user.username).toMatch(data.username)
        })
        .catch(err => expect(err).toBeNull())
    })
    .catch(err => expect(err).toBeNull())
})

test('getUser returns undefined with incorrect username', () => {
  return db
    .registerUser(user, testDb)
    .then(() => {
      user.username = 'sammy'
      db.getUser(user, testDb)
        .then(data => {
          expect(data).toBeUndefined()
        })
        .catch(err => expect(err).toBeNull())
    })
    .catch(err => expect(err).toBeNull())
})
