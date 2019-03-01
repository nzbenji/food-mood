import {addMoodApi, getMostRecentMoodApi} from '../api/moods'

export function getMostRecentMood (userId) {
  return function (dispatch) {
    dispatch(requestMood())
    getMostRecentMoodApi(userId)
      .then(res => {
        const mood = res
        dispatch(receiveMood(mood))
      })
  }
}

function requestMood () {
  return {
    type: 'REQUESTING_MOOD'
  }
}

function receiveMood (mood) {
  return {
    type: 'RECEIVING_MOOD',
    mood
  }
}

export function saveNewMood (mood) {
  return function (dispatch) {
    // we're optimistic ;)
    dispatch(requestAddMood())
    dispatch(updateMood(mood))
    addMoodApi(mood)
      .then(() => {
        dispatch(receiveAddMood())
      })
      .catch(err => {
        if (err) dispatch(receiveAddMood())
      })
  }
}

function requestAddMood () {
  return {
    type: 'REQUESTING_ADD_MOOD'
  }
}

function receiveAddMood () {
  return {
    type: 'RECEIVING_ADD_MOOD'
  }
}

export const updateMood = (mood) => {
  return {
    type: 'UPDATE_MOOD',
    mood
  }
}