const auth = require('../../../client/actions/auth')

test('signinPending returns expected type', () => {
  const expectedType = 'SIGNIN_PENDING'
  const actualType = auth.signinPending().type
  expect(actualType).toBe(expectedType)
})

test('signinSuccess returns expected type', () => {
  const expectedType = 'SIGNIN_SUCCESS'
  const actualType = auth.signinSuccess().type
  expect(actualType).toBe(expectedType)
})

test('signinError returns expected type', () => {
  const expectedType = 'SIGNIN_ERROR'
  const actualType = auth.signinError().type
  expect(actualType).toBe(expectedType)
})

test('registerPending returns expected type', () => {
  const expectedType = 'REGISTER_PENDING'
  const actualType = auth.registerPending().type
  expect(actualType).toBe(expectedType)
})

test('registerSuccess returns expected type', () => {
  const expectedType = 'REGISTER_SUCCESS'
  const actualType = auth.registerSuccess().type
  expect(actualType).toBe(expectedType)
})

test('registerError returns expected type', () => {
  const expectedType = 'REGISTER_ERROR'
  const actualType = auth.registerError().type
  expect(actualType).toBe(expectedType)
})

// still need to test signin and register functions (hard)

test('logout returns expected type', () => {
  const expectedType = 'LOGOUT'
  const actualType = auth.logout().type
  expect(actualType).toBe(expectedType)
})
