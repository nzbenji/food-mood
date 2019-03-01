import {setToken} from '../utils/tokens'
import {register as registerApi, signin as signinApi} from '../api/auth'

export const signinPending = () => {
  return {
    type: 'SIGNIN_PENDING'
  }
}

export const signinSuccess = (id) => {
  return {
    type: 'SIGNIN_SUCCESS',
    id
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

export const registerSuccess = (id) => {
  return {
    type: 'REGISTER_SUCCESS',
    id
  }
}

export const registerError = error => {
  return {
    type: 'REGISTER_ERROR',
    error
  }
}

export const signin = (user) => dispatch => {
  dispatch(signinPending())
  return signinApi(user)
    .then(res => {
      setToken(res.token)
      dispatch(signinSuccess(res.userId))
    })
    .catch(err => {
      dispatch(signinError(err))
    })
}

export const register = (user) => dispatch => {
  dispatch(registerPending())
  return registerApi(user)
    .then(res => {
      setToken(res.token)
      dispatch(registerSuccess(res.userId))
    })
    .catch(err => {
      return dispatch(registerError(err))
    })
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}
