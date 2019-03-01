import {addMoodApi} from '../api/moods'

export function saveNewMood (mood) {
  return function (dispatch) {
    // we're optimistic ;)
    dispatch(requestAddMood())
    dispatch(mostRecentMood(mood))
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
    type: 'REQUESTING_API'
  }
}

function receiveAddMood () {
  return {
    type: 'RECEIVING_API'
  }
}

export const mostRecentMood = (mood) => {
  return {
    type: 'UPDATE_MOOD',
    mood
  }
}
