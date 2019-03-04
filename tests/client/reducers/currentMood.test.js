const currentMood = require('../../../client/reducers/currentMood')

test('auth reducer receives mood based on current mood', () => {
  const action = {
    type: 'RECEIVING_MOOD'
  }

  const expectedReduced = action.mood

  const actualReduced = currentMood.default('', action)
  expect(actualReduced).toBe(expectedReduced)
})

test('auth reducer updates current mood', () => {
  const action = {
    type: 'UPDATE_MOOD'
  }

  const expectedReduced = action.mood

  const actualReduced = currentMood.default('', action)
  expect(actualReduced).toBe(expectedReduced)
})

test('auth reducer clears current mood', () => {
  const action = {
    type: 'CLEAR_MOOD'
  }

  const expectedReduced = {}

  const actualReduced = currentMood.default('', action)
  expect(actualReduced).toEqual(expectedReduced)
})
