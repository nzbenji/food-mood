export const addMeal = ({day, meal}) => {
  return {
    type: 'ADD_MEAL',
    day,
    meal
  }
}

export const removeMeal = ({day, meal}) => {
  return {
    type: 'REMOVE_MEAL',
    day,
    meal
  }
}