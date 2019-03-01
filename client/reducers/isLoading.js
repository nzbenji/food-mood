const initialLoadingState = false

const isLoading = (state = initialLoadingState, action) => {
  switch (action.type) {
    case 'REQUESTING_EMOTIONS':
      return true
    case 'RECEIVING_EMOTIONS':
      return false
    case 'REQUESTING_ADD_MOOD':
      return true
    case 'RECEIVING_ADD_MOOD':
      return false
    case 'REQUESTING_MOOD':
      return true
    default:
      return state
  }
}

export default isLoading
