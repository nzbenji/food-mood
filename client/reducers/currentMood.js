const initialMood = {}

const currentMood = (state = initialMood, action) => {
  switch (action.type) {
    case 'UPDATE_MOOD':
      return action.mood
    default:
      return state
  }
}

export default currentMood
