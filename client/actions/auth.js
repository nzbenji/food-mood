import {setToken} from '../utils/tokens'
import {setUserId} from '../utils/userId'
import {register as registerApi, signin as signinApi} from '../api/auth'

// Actions for signing in and registering
export const signinPending = () => {
  return {
    type: 'SIGNIN_PENDING'
  }
}

export const signinSuccess = () => {
  return {
    type: 'SIGNIN_SUCCESS'
  }
}

export const signinError = error => {
  return {
    type: 'SIGNIN_ERROR',
    error
  }
}

export const registerPending = () => {
  return {
    type: 'REGISTER_PENDING'
  }
}

export const registerSuccess = () => {
  return {
    type: 'REGISTER_SUCCESS'
  }
}

export const registerError = error => {
  return {
    type: 'REGISTER_ERROR',
    error
  }
}
// Sign in. Tokens are encrypted versions of a users password. This protects your password from Hackers.
export const signin = (user) => dispatch => {
  dispatch(signinPending())
  return signinApi(user)
    .then(res => {
      setToken(res.token)
      setUserId(res.userId)
      dispatch(signinSuccess())
    })
    .catch(err => {
      dispatch(signinError(err))
    })
}

// The dispatch sends the data typed in to our store
// Our register action
export const register = (user) => dispatch => {
  dispatch(registerPending())
  return registerApi(user)
    .then(res => {
      setToken(res.token)
      setUserId(res.userId)
      dispatch(registerSuccess())
    })
    .catch(err => {
      return dispatch(registerError(err))
    })
}

// Log out action
export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}
