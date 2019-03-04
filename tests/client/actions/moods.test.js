const mood = require('../../../client/actions/moods')

test('requestMood returns expected type', () => {
  const expectedType = 'REQUESTING_MOOD'
  const actualType = mood.requestMood().type
  expect(actualType).toBe(expectedType)
})

test('receiveMood returns expected type', () => {
  const expectedType = 'RECEIVING_MOOD'
  const actualType = mood.receiveMood().type
  expect(actualType).toBe(expectedType)
})

test('requestAddMood returns expected type', () => {
  const expectedType = 'REQUESTING_ADD_MOOD'
  const actualType = mood.requestAddMood().type
  expect(actualType).toBe(expectedType)
})

test('receiveAddMood returns expected type', () => {
  const expectedType = 'RECEIVING_ADD_MOOD'
  const actualType = mood.receiveAddMood().type
  expect(actualType).toBe(expectedType)
})

test('updateMood returns expected type', () => {
  const expectedType = 'UPDATE_MOOD'
  const actualType = mood.updateMood().type
  expect(actualType).toBe(expectedType)
})
