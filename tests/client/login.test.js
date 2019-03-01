import nock from 'nock'
import * as auth from '../../client/actions/auth'

let state = null

beforeAll(() => {
  nock(/.*/)
    .persist()
    .post('/api/v1/auth/login', {username: 'abc', password: '123'})
    .reply(201, {ok: true, token: '0123456789ABCDEF'})
    .post('/api/v1/auth/login', {username: 'abc'})
    .reply(401, {ok: false, error: 'No password provided.'})
    .post('/api/v1/auth/login', {username: 'abc', password: '123', email: 'bar@foo'})
    .reply(201, {ok: true, token: '0123456789ABCDEF'})
    .post('/api/v1/auth/login', {username: 'xyz', password: '321'})
    .reply(201, {ok: false, error: 'No email provided'})
})

afterAll(() => {
  nock.cleanAll()
})

beforeEach(() => {
  state = {
    error: null,
    loggedIn: false,
    newRegistration: false,
    pending: false
  }
})

test('signinPending matches the last snapshot', () => {
  expect(auth.signinPending()).toMatchSnapshot()
})

test('signinSuccess matches the last snapshot', () => {
  expect(auth.signinSuccess()).toMatchSnapshot()
})

test.skip('signinError matches the last snapshot', () => {
  expect(auth.signinError('something wrong happend')).toMatchSnapshot()
})

// To fix signin
test.skip('sign in dispatches PENDING', () => {
  expect.assertions(1)
  const expected = {type: 'SIGNIN_SUCCESS'}
  const dispatch = jest.fn()
  return auth.signin('abc', '123')(dispatch)
    .then(() => expect(dispatch).toHaveBeenCalledWith(expected))
})

test('sign in dispatches SUCCESS', () => {
  expect.assertions(1)
  const expected = {type: 'SIGNIN_PENDING'}
  const dispatch = jest.fn()
  return auth.signin('abc', '123')(dispatch)
    .then(() => expect(dispatch).toHaveBeenCalledWith(expected))
})

test.skip('sign in dispatches FAILURE on error', () => {
  expect.assertions(1)
  const expected = {type: 'SIGNIN_ERROR', error: 'No password provided'}
  const dispatch = jest.fn()
  return auth.signin('abc')(dispatch)
    .then(() => expect(dispatch).toHaveBeenCalledWith(expected))
})
