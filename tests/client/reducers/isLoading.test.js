const reducer = require('../../../client/reducers/isLoading')

// Is loading
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