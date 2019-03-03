import request from 'superagent'

const url = 'http://localhost:3000/api/v1/emotions'


export const emotionGetter = () => {
  return request
    .get(`${url}/`)
    .then(res => res.body)
}

export const recentEmotion = (emotionId) => {
  return request
  .get(`${url}/mostRecent/${emotionId}`)
  .then(res => res.body)
}
