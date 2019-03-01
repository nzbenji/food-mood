const testEnv = require('./test-environment')
const db = require('../../server/db/meals')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

const meal = {
  user_id: 1,
  title: 'bap',
  time: '2019-03-04 14:00:45'
}

test('userMeals returns all meals for a user', () => {
  const expectedLength = 3
  return db
    .userMeals(1, testDb)
    .then(meals => {
      const actualLength = meals.length
      expect(actualLength).toBe(expectedLength)
    })
    .catch(err => expect(err).toBeNull())
})

test('newMeal inserts a new meal for a user', () => {
  const expectedId = 4
  return db.newMeal(meal, testDb)
    .then(([actualId]) => {
      expect(actualId).toBe(expectedId)
    })
    .catch(err => expect(err).toBeNull())
})

test('latestMeal gets the last meal for a user', () => {
  const expectedId = 3
  return db.latestMeal(1, testDb)
    .then((meal) => {
      expect(meal.id).toBe(expectedId)
    })
    .catch(err => expect(err).toBeNull())
})

test('allMealMoods gets all the moods for a meal', () => {
  const expectedLength = 1
  return db.allMealMoods(1, testDb)
    .then((moods) => {
      expect(moods.length).toBe(expectedLength)
    })
    .catch(err => expect(err).toBeNull())
})
