import request from 'superagent'
import {getToken} from '../utils/tokens'

const url = 'http://localhost:3000/api/v1/meals'

// Adds a new meal
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

// Updates a selected meal
export function editMealApi (meal) {
  return request
    .put(`${url}/editMeal`)
    .set({Authorization: `Bearer ${getToken()}`})
    .send(meal)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot update meal')
    })
}

// Displays the most recent meal
export function mostRecentMealApi (userId) {
  return request
    .get(`${url}/mostRecent/${userId}`)
    .set({Authorization: `Bearer ${getToken()}`})
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get most recent meal')
    })
}

// Gets meals and moods
export function getMealsAndMoods (userId) {
  return request
    .get(`${url}/${userId}`)
    .set({Authorization: `Bearer ${getToken()}`})
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get all user\'s meals and moods')
    })
}

export function getMealsApi (userId) {
  return request
    .get(`${url}/userMeals/${userId}`)
    .set({Authorization: `Bearer ${getToken()}`})
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get all user\'s meals')
    })
}
