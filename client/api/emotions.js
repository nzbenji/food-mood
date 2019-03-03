import request from 'superagent'
import {getToken} from '../utils/tokens'

const url = 'http://localhost:3000/api/v1/emotions'

export const emotionGetter = () => {
  return request
    .get(`${url}/`)
    .set({Authorization: `Bearer ${getToken()}`})
    .then(res => res.body)
}
