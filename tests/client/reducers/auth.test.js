const reducer = require('../../../client/reducers/auth')

// Signin pending action test
test('auth reducer returns new state based on signin pending', () => {
  const action = {
    type: 'SIGNIN_PENDING'
  }

  const expectedReduced = {
    loggedIn: false,
    pending: true
  }

  const actualReduced = reducer.default('', action)
  expect(actualReduced.loggedIn).toBe(expectedReduced.loggedIn)
  expect(actualReduced.pending).toBe(expectedReduced.pending)
})
// Signin success action test
test('auth reducer returns new state based on a successful sign in', () => {
  const action = {
    type: 'SIGNIN_SUCCESS'
  }

  const expectedSignInSuccess = {
    error: null,
    loggedIn: true,
    pending: false
  }

  const actualReduced = reducer.default('', action)
  expect(actualReduced.error).toBe(expectedSignInSuccess.error)
  expect(actualReduced.loggedIn).toBe(expectedSignInSuccess.loggedIn)
  expect(actualReduced.pending).toBe(expectedSignInSuccess.pending)
})

// Register success action test
test('auth reducer returns new state based on a successful sign in', () => {
  const action = {
    type: 'REGISTER_SUCCESS'
  }

  const expectedRegisterSuccess = {
    error: null,
    newRegistration: true,
    loggedIn: true,
    pending: false
  }

  const actualReduced = reducer.default('', action)
  expect(actualReduced.error).toBe(expectedRegisterSuccess.error)
  expect(actualReduced.loggedIn).toBe(expectedRegisterSuccess.loggedIn)
  expect(actualReduced.pending).toBe(expectedRegisterSuccess.pending)
})

test('auth reducer returns signin error when error occurs', () => {
  const action = {
    type: 'SIGNIN_ERROR'
  }

  const expectedReducedSigninErr = {
    error: true,
    loggedIn: false,
    pending: false
  }

  const actualReducedSigninErr = reducer.default('', action)
  expect(actualReducedSigninErr.error).toBe(expectedReducedSigninErr.error)
  expect(actualReducedSigninErr.loggedIn).toBe(expectedReducedSigninErr.loggedIn)
  expect(actualReducedSigninErr.pending).toBe(expectedReducedSigninErr.pending)
})

test('auth reducer returns register error when error occurs', () => {
  const action = {
    type: 'REGISTER_ERROR'
  }

  const expectedRegisterErr = {
    error: true,
    loggedIn: false,
    pending: false
  }

  const actualRegisterErr = reducer.default('', action)
  expect(actualRegisterErr.error).toBe(expectedRegisterErr.error)
  expect(actualRegisterErr.loggedIn).toBe(expectedRegisterErr.loggedIn)
  expect(actualRegisterErr.pending).toBe(expectedRegisterErr.pending)
})

test('auth reducer successfully logs out', () => {
  const action = {
    type: 'LOGOUT'
  }

  const expectedReducedLogout = {
    loggedIn: false,
  }

  const actualReducedLogout = reducer.default('', action)
  expect(actualReducedLogout.loggedIn).toBe(expectedReducedLogout.loggedIn)
})
