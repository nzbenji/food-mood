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

// Various actions to do with mood
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

export function saveNewMood (mood, currentMealId) {
  return function (dispatch) {
    // we're optimistic ;)
    dispatch(requestAddMood())
    addMoodApi(mood, currentMealId)
      .then((id) => {
        mood.id = id
        mood.meal_id = currentMealId
        dispatch(updateMood(mood))
        dispatch(receiveAddMood())
      })
      .catch(err => {
        if (err) dispatch(receiveAddMood())
      })
  }
}

// Actions which request, receibe and save moods
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
