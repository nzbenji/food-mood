import request from 'superagent'

const url = 'http://localhost:3000/api/v1/meals'

export function addMealApi (newMeal) {
  request
    .get(`${url}/${newMeal}`)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot add meal')
    })
}

export function mostRecentMealApi (meal) {
  request
    .get(`${url}/${meal}`)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get most recent meal')
    })
}

export function getMealsApi (allMeals) {
  request
    .get(`${url}/${allMeals}`)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get all user\'s meals')
    })
}
