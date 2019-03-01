import request from 'superagent'

const recentMealApi = 'http://localhost:3000/api/v1/recentMeal'

export function recentMeal (meal) {
  request
    .get(`${recentMealApi}`)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get recent meal')
    })
}
