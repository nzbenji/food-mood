const reducer = require('../../../client/reducers/isLoading')

// Is loading
test('Is loading requesting emotions state', () => {
    const loading = {
      type: 'REQUESTING_EMOTIONS'
    }
  
    const expectedLoading = {
        state: true
    }
  
    const actualLoading = reducer.default('', loading)
    expect(actualLoading.state).toBe(expectedLoading.state)
  })