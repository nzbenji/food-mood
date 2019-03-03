import emotionGetter from '../api/emotions'
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

export function getRecentEmotion (id) {
  return function (dispatch) {
    dispatch(requestRecentEmotion())
    request
    .get(`${url}/mostRecent/${id}`)
    .then(res  => res.body)
    .then(res => {
      dispatch(receiveRecentEmotion(res))
  })
  .catch(err => {
    console.log(err)
  })
 }
}

function requestRecentEmotion () {
  return {
    type: 'REQUEST_RECENT_EMOTION'
  }
}

function receiveRecentEmotion (recentEmoji) {
  return {
    type: 'RECEIVE_RECENT_EMOTION',
    recentEmoji
  }
}

function requestEmotions () {
  return {
    type: 'REQUESTING_EMOTIONS'
  }
}

function receiveEmotions (emotions) {
  return {
    type: 'RECEIVING_EMOTIONS',
    emotions
  }
}
