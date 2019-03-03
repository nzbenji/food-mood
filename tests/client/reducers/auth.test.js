import auth from '../../client/reducers/auth'

// AUTH REDUCER TEST

// A reducer is a pure function that takes the previous state and an action
// Then it returns the next state

describe("auth reducer", () => {
    test("auth reducer", () => {
      const initialState = {
        error: null,
        loggedIn: !!getToken(),
        newRegistration: false,
        pending: false,
        userId: getUserId()
      };

      const action = {
        type: 'SIGNIN_PENDING',
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