const emotions = require('../../../client/actions/emotions')

test('requestEmotions returns expected type', () => {
  const expectedType = 'REQUESTING_EMOTIONS'
  const actualType = emotions.requestEmotions().type
  expect(actualType).toBe(expectedType)
})

test('receiveEmotions returns expected type', () => {
  const expectedType = 'RECEIVING_EMOTIONS'
  const actualType = emotions.receiveEmotions().type
  expect(actualType).toBe(expectedType)
})
