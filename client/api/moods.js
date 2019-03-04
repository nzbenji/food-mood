import request from 'superagent'
import {getToken} from '../utils/tokens'

const url = 'http://localhost:3000/api/v1/moods'

export function getMealMoodsApi (mealId) {
  return request
    .get(`${url}/${mealId}`)
    .set({Authorization: `Bearer ${getToken()}`})
    .then(res => res.body)
    .catch(err => {
      if (err) throw Error('Cannot get mood')
    })
}

export function getMostRecentMoodApi (userId) {
  return request
    .get(`${url}/mostRecent/${userId}`)
    .set({Authorization: `Bearer ${getToken()}`})
    .then(res => res.body)
}

export function addMoodApi (mood, currentMealId) {
  return request
    .post(`${url}/${currentMealId}`)
    .set({Authorization: `Bearer ${getToken()}`})
    .send(mood)
    .then(res => res.body)
}

export function editMoodApi (mood) {
  return request
    .put(`${url}/editMood`)
    .set({Authorization: `Bearer ${getToken()}`})
    .send(mood)
    .then(res => res.body)
}

export function deleteMoodApi (mood) {
  return request
    .delete(`${moodUrl}/deleteMood/${mood.id}`)
    .set({Authorization: `Bearer ${getToken()}`})
    .then(res => res.body)
}
