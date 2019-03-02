// import {ADD_MEAL, REMOVE_MEAL} from '../actions/meals'

// const INITIAL_MENU = {
//   breakfast: null,
//   lunch: null,
//   dinner: null,
//   snacks: null
// }

// const calendarState = {
//   monday: {...INITIAL_MENU},
//   tuesday: {...INITIAL_MENU},
//   wedensday: {...INITIAL_MENU},
//   thursday: {...INITIAL_MENU},
//   friday: {...INITIAL_MENU},
//   saturday: {...INITIAL_MENU},
//   sunday: {...INITIAL_MENU}
// }

// const calendarReducer = (state = calendarState, action) => {
//   switch (action.type) {
//     case ADD_MEAL:
//       return {
//         ...state,
//         [action.day]: {
//           ...state[action.day],
//           [action.meal]: action.meal
//         }
//       }
//     default:
//       return state

//     case REMOVE_MEAL:
//       return {
//         ...state,
//         [action.day]: {
//           ...state[action.day],
//           [action.meal]: null
//         }
//       }
//   }
// }

// export default calendarReducer
