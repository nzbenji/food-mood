import {combineReducers} from 'redux'
import auth from './auth'
import emotions from './emotions'
import isLoading from './isLoading'
import currentMood from './currentMood'

export default combineReducers({
  auth,
  emotions,
  isLoading,
  currentMood
})
