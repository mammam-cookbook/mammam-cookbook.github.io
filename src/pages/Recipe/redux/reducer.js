import { ResetReducer } from 'pages/SignIn/redux/actions'
import {
  GetDetailRecipe,
  GetDetailRecipeFailed,
  GetDetailRecipeSuccess,
  UpdateIsCountdown
} from './actions'
const initialState = {
  recipeDetail: null,
  isLoading: false,
  isCountDown: false
}

export function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case GetDetailRecipe.type:
      return {
        ...state,
        isLoading: true
      }
    case GetDetailRecipeSuccess.type:
      return {
        ...state,
        recipeDetail: action.payload,
        isLoading: false
      }
    case GetDetailRecipeFailed.type:
      return {
        ...state,
        isLoading: false
      }
    case UpdateIsCountdown.type:
      return {
        ...state,
        isCountDown: action.payload
      }
    case ResetReducer.type:
      return initialState
    default:
      return state
  }
}
