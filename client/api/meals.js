import request from 'superagent'
import {getToken} from '../utils/tokens'

const url = 'http://localhost:3000/api/v1/meals'

export function addMealApi (userId, newMeal) {
  return request
    .post(`${url}/${userId}`)
    .set({Authorization: `Bearer ${getToken()}`})
    .send(newMeal)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot add meal')
    })
}

export function mostRecentMealApi (userId) {
  return request
    .get(`${url}/mostRecent/${userId}`)
    .set({Authorization: `Bearer ${getToken()}`})
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get most recent meal')
    })
}

export function getMealsAndMoods (userId) {
  return request
    .get(`${url}/${userId}`)
    .set({Authorization: `Bearer ${getToken()}`})
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get all user\'s meals')
    })
}
