const reducer = require('../../../client/reducers/emotions')

test('emotions reducers returns expected value', () => {
  const action = {
    type: 'RECEIVING_EMOTIONS',
    emotions: 'hello'
  }
  const expectedEmotions = action.emotions
  const actualEmotions = reducer.default('', action)
  expect(actualEmotions).toBe(expectedEmotions)
})
