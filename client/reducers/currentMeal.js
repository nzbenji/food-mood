const initialMealState = ''

const currentMeal = (state = initialMealState, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_MEAL':
      return action.meal
    default:
      return state
  }
}

export default currentMeal
