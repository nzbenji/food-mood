import request from 'superagent'

const url = 'http://localhost:3000/api/v1/meals/moods'

export function getMostRecentMoodApi (userId) {
  return request
    .get(`${url}/mostRecent/:${userId}`)
    .then(res => res.body)
}