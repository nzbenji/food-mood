import {combineReducers} from 'redux'
import auth from './auth'
import emotions from './emotions'
import isLoading from './isLoading'

export default combineReducers({
  auth,
  emotions,
  isLoading
})
