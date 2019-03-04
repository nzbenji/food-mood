import request from 'superagent'

const url = 'http://localhost:3000/api/v1/auth'

// Posts url to the browser with /register
export function register (user) {
  return request
    .post(`${url}/register`)
    .send(user)
    .then(res => res.body)
}

// Handles the user signin
export const signin = (user) => {
  return request
    .post(`${url}/signin`)
    .send(user)
    .then(res => res.body)
}
