import request from 'superagent'

const url = 'http://localhost:3000/api/v1/meals/moods'
const addMoodUrl= 'http://localhost:3000/api/v1/moods'

export function moodMealApi (meal) {
  return request
    .get(`${url}/${meal}`)
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get mood')
    })
}

export function getMostRecentMoodApi (userId) {
  return request
    .get(`${url}/mostRecent/:${userId}`)
    .then(res => res.body)
}

export function addMoodApi (mood, currentMealId) {
  return request
    .post(`${addMoodUrl}/${currentMealId}`)
    .send(mood)
    .then(res => res.body)
}
