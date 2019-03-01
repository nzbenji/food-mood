const testEnv = require('./test-environment')
const db = require('../../server/db/moods')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('latestMood gets the latest mood for a user', () => {
  const expectedId = 3
  return db
    .latestMood(1, testDb)
    .then(moods => {
      const actualId = moods.id
      expect(actualId).toBe(expectedId)
    })
    .catch(err => expect(err).toBeNull())
})