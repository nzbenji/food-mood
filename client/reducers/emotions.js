const initialEmotionState = []

const emotions = (state = initialEmotionState, action) => {
  switch (action.type) {
    case 'RECEIVING_EMOTIONS':
      return {
        ...state,
        allEmotions: action.emotions
      }
      case 'RECEIVE_RECENT_EMOTION':
      return {
        ...state,
        recentEmotion: action.recentEmoji
      }
    default:
      return state
  }
}


export default emotions
