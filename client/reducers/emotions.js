const initialEmotionState = []

const emotions = (state = initialEmotionState, action) => {
  switch (action.type) {
    case 'RECEIVING_EMOTIONS':
      return action.emotions
    default:
      return state
  }
}

export default emotions
