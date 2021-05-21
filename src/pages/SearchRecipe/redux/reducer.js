import { ResetReducer } from 'pages/SignIn/redux/actions'
import {
  SearchRecipes,
  SearchRecipesFailed,
  SearchRecipesSuccess
} from './actions'
const initialState = {
  isLoading: false,
  result: [],
  currentPage: 1,
  totalItems: 0
}

export function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SearchRecipes.type:
      return {
        ...state,
        isLoading: true
      }
    case SearchRecipesSuccess.type:
      return {
        ...state,
        isLoading: false,
        result: action.payload.rows,
        totalItems:
          action.payload.count && action.payload.count?.length > 0
            ? Number(action.payload.count[0]?.count)
            : 0,
        currentPage: action.payload.currentPage
      }
    case SearchRecipesFailed.type:
      return {
        ...state,
        isLoading: false
      }
    case ResetReducer.type:
      return initialState
    default:
      return state
  }
}
