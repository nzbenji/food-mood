import {getToken, clearToken} from '../utils/tokens'

const initialState = {
  error: null,
  loggedIn: !!getToken(),
  newRegistration: false,
  pending: false,
  userId: -1
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case 'SIGNIN_PENDING':
    case 'REGISTER_PENDING':
      return {
        ...state,
        loggedIn: false,
        pending: true
      }
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        error: null,
        loggedIn: true,
        pending: false,
        userId: action.id
      }
    case 'REGISTER_SUCCESS':
      console.log(action)
      return {
        ...state,
        error: null,
        newRegistration: true,
        loggedIn: true,
        pending: false,
        userId: action.id
      }
    case 'SIGNIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        error: true,
        loggedIn: false,
        pending: false,
        userId: -1
      }
    case 'LOGOUT':
      clearToken()
      return {
        ...state,
        loggedIn: false,
        userId: -1
      }
    default:
      return state
  }
}
