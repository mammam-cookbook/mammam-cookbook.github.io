import { ResetReducer } from 'pages/SignIn/redux/actions'
import { SearchIngredientSuccess } from './actions'
const initialState = {
  ingredients: []
}

export function createReducer(state = initialState, action) {
  switch (action.type) {
    case SearchIngredientSuccess.type:
      return {
        ...state,
        ingredients: action.payload
      }
    case ResetReducer.type:
      return initialState
    default:
      return state
  }
}
