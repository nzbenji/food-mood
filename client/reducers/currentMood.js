const initialMood = {}

export const currentMood = (state = initialMood, action) => {
  switch (action.type) {
    case 'RECEIVING_MOOD':
    case 'UPDATE_MOOD':
      return action.mood
    case 'CLEAR_MOOD':
      return {}
    default:
      return state
  }
}

export default currentMood
