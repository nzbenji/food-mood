import request from 'superagent'

const url = 'http://localhost:3000/api/v1/emotions'

// had to have api in here because javascript does not know what a function is
export function getEmotions () {
  return function (dispatch) {
    dispatch(requestEmotions())
    request
      .get(`${url}/`)
      .then(res => res.body)
      .then(res => {
        dispatch(receiveEmotions(res))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function requestEmotions () {
  return {
    type: 'REQUESTING_EMOTIONS'
  }
}

export function receiveEmotions (emotions) {
  return {
    type: 'RECEIVING_EMOTIONS',
    emotions
  }
}
