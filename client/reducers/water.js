const initialState = {
  weight: 0,
  exercise: 0,
  cupsDrank: 0,
  cupsRequired: 0,
  percentage: 0
}

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_WATER':
      return {
        ...action.water
      }
    case 'CLEAR_WATER':
      return {
        weight: 0,
        exercise: 0,
        cupsDrank: 0,
        cupsRequired: 0,
        percentage: 0
      }
    default:
      return state
  }
}
