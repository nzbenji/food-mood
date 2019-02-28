const initialLoadingState = false

const isLoading = (state = initialLoadingState, action) => {
  switch (action.type) {
    case 'REQUESTING_EMOTIONS':
      return true
    case 'RECEIVING_EMOTIONS':
      return false
    default:
      return state
  }
}

export default isLoading
