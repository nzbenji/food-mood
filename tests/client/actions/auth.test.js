const auth = require('../../../client/actions/auth')

test('signinPending returns expected type', () => {
  const expectedType = 'SIGNIN_PENDING'
  const actualType = auth.signinPending().type
  expect(actualType).toBe(expectedType)
})
