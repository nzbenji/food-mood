// AUTH REDUCER TEST

// A reducer is a pure function that takes the previous state and an action
// Then it returns the next state

// Tests for reducers
describe("dataloader reducers", () => {
    test("dataRequested", () => {
      const initialState = {};
      const action = {
        type: "DATA_LOADER/REQUEST_DATA",
        payload: {
         session: { sessionId: "sid" }
        }
      };
      const newState = dataloader(initialState, action);
      expect(newState).toEqual({
        data: null,
        session: { "sessionId": "sid" },
        error: null,
        dataLoading: false,
        dataRequested: true
      });
    });
    
    test("set loading", () => {
      const initialState = {
        data: null,
        session: { "sessionId": "sid" },
        error: null,
        dataLoading: false,
        dataRequested: true
      };
      const action = {
        type: "DATA_LOADER/SET_DATA_LOADING",
        payload: "drid"
      };
      const newState = dataloader(initialState, action);
      expect(newState).toEqual({
        data: null,
        dataRequestId: "drid",
        session: { "sessionId": "sid" },
        error: null,
        dataLoading: true,
        dataRequested: true
      });
    });
  
    // ...and so on...
  });