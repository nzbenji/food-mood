export const updateWater = (water) => {
  return {
    type: 'UPDATE_WATER',
    water
  }
}

export function clearWater () {
  return {
    type: 'CLEAR_WATER'
  }
}