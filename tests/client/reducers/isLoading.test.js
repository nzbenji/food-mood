const reducer = require('../../../client/reducers/isLoading')

// REQUESTING_EMOTIONS
test('Is loading requesting emotions state', () => {
    const loading = {
      type: 'REQUESTING_EMOTIONS',
      return: true
    }
  
    const expectedLoading = {
    return: true
    }
  
    const actualLoading = reducer.default('', loading)
    expect(actualLoading.state).toBe(expectedLoading.state)
  })

  // RECEIVING_EMOTIONS
test('Is loading requesting emotions state', () => {
    const loading = {
      type: 'REQUESTING_EMOTIONS',
      return: false
    }
  
    const expectedLoading = {
    return: false
    }
  
    const actualLoading = reducer.default('', loading)
    expect(actualLoading.state).toBe(expectedLoading.state)
  })

  // REQUESTING_ADD_MOOD
test('Is loading requesting emotions state', () => {
    const loading = {
      type: 'REQUESTING_ADD_MOOD',
      return: true
    }
  
    const expectedLoading = {
    return: true
    }
  
    const actualLoading = reducer.default('', loading)
    expect(actualLoading.state).toBe(expectedLoading.state)
  })

  // RECEIVING_ADD_MOOD
test('Is loading requesting emotions state', () => {
    const loading = {
      type: 'RECEIVING_ADD_MOOD',
      return: false
    }
  
    const expectedLoading = {
    return: false
    }
  
    const actualLoading = reducer.default('', loading)
    expect(actualLoading.state).toBe(expectedLoading.state)
  })

   // REQUESTING_MOOD
test('Is loading requesting emotions state', () => {
    const loading = {
      type: 'REQUESTING_MOOD',
      return: true
    }
  
    const expectedLoading = {
    return: true
    }
  
    const actualLoading = reducer.default('', loading)
    expect(actualLoading.state).toBe(expectedLoading.state)
  })