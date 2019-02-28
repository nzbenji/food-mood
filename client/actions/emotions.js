import {getEmotionsApi} from '../api/getEmotionsApi'

export const getEmotions = () => {
  return function (dispatch) {
    dispatch(requestEmotions())
    getEmotionsApi
      .then(res => {
        dispatch(receiveEmotions(res))
      })
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