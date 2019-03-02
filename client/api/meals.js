import request from 'superagent'

const url = 'http://localhost:3000/api/v1/meals'

export function addMealApi (userId, newMeal) {
  return request
    .post(`${url}/${userId}`)
    .send(newMeal)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot add meal')
    })
}

export function mostRecentMealApi (meal) {
  return request
    .get(`${url}/${meal}`)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get most recent meal')
    })
}

export function getMealsApi (userId) {
  return request
    .get(`${url}/${userId}`)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get all user\'s meals')
    })
}
