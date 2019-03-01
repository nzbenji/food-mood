import request from 'superagent'

const url = 'http://localhost:3000/api/v1/emotions'

export function getEmotionsApi (user) {
  return request
    .post(`${url}/`)
    .then(res => res.body)
}
