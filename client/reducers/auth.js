import {getToken, clearToken} from '../utils/tokens'
import {clearUserId, getUserId} from '../utils/userId'

// Our default state
const initialState = {
  error: null,
  loggedIn: !!getToken(),
  newRegistration: false,
  pending: false,
  userId: getUserId()
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
        userId: getUserId()
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        error: null,
        newRegistration: true,
        loggedIn: true,
        pending: false,
        userId: getUserId()
      }
    case 'SIGNIN_ERROR':
    case 'REGISTER_ERROR':
      return {
        ...state,
        error: true,
        loggedIn: false,
        pending: false,
        userId: clearUserId()
      }
    case 'LOGOUT':
      clearToken()
      clearUserId()
      return {
        ...state,
        loggedIn: false,
        userId: getUserId()
      }
    default:
      return state
  }
}
