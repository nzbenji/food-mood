const testEnv = require('./test-environment')
const db = require('../../server/db/emotions')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('getEmotions returns all emotions', () => {
  const expectedLength = 3
  return db
    .getEmotions(testDb)
    .then(emotions => {
      const actualLength = emotions.length
      expect(actualLength).toBe(expectedLength)
    })
    .catch(err => expect(err).toBeNull())
})

test('emotion contain id, ranking and emoji', () => {
  return db
    .getEmotions(testDb)
    .then(emotions => {
      expect(emotions[0].id).toBeTruthy()
      expect(emotions[0].ranking).toBeTruthy()
      expect(emotions[0].emoji).toBeTruthy()
    })
    .catch(err => expect(err).toBeNull())
})
