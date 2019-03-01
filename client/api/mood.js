import request from 'superagent'

const moodMealApi = 'http://localhost:3000/api/v1/mood'

export function moodMeal (meal) {
  request
    .get(`${moodMealApi}/${meal}`)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get mood')
    })
}
