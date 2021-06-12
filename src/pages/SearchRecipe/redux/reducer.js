import { ResetReducer } from 'pages/SignIn/redux/actions'
import {
  SearchRecipes,
  SearchRecipesFailed,
  SearchRecipesSuccess,
  SearchUsers,
  SearchUsersFailed,
  SearchUsersSuccess
} from './actions'
const initialState = {
  isLoading: false,
  result: [],
  resultUser: [],
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
        totalItems: action.payload.total ? Number(action.payload.total) : 0,
        currentPage: action.payload.currentPage
      }
    case SearchRecipesFailed.type:
      return {
        ...state,
        isLoading: false
      }
    case SearchUsers.type:
      return {
        ...state,
        isLoading: true
      }
    case SearchUsersSuccess.type:
      return {
        ...state,
        isLoading: false,
        resultUser: action.payload.rows
      }
    case SearchUsersFailed.type:
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
