const initialMood = {}

const currentMood = (state = initialMood, action) => {
  switch (action.type) {
    case 'RECEIVING_MOOD':
    case 'UPDATE_MOOD':
      return action.mood
    default:
      return state
  }
}

export default currentMood
