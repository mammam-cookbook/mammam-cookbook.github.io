import { PAGE } from 'pages/Dashboard/constant'
import {
  SearchRecipes,
  SearchRecipesFailed,
  SearchRecipesSuccess
} from 'pages/SearchRecipe/redux/actions'
import { SignOut } from 'pages/SignIn/redux/actions'
import {
  GetAllCategories,
  GetAllCategoriesFailed,
  GetAllCategoriesSuccess,
  GetAllProblem,
  GetAllProblemFailed,
  GetAllProblemSuccess,
  GetUsers,
  GetUsersFailed,
  GetUsersSuccess,
  SetCurrentPage
} from './actions'
const initialState = {
  isLoading: false,
  isLoadingDashboard: false,
  currentPage: PAGE.DASHBOARD,
  detailPage: null,
  categoryList: [],
  problemList: [],
  userList: [],
  userDetail: null,
  recipeList: []
}

export function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GetAllCategories.type:
      return { ...state, isLoading: true }
    case GetAllCategoriesSuccess.type:
      return { ...state, categoryList: action.payload, isLoading: false }
    case GetAllCategoriesFailed.type:
      return { ...state, isLoading: false }
    case GetAllProblem.type:
      return { ...state, isLoading: true }
    case GetAllProblemSuccess.type:
      return { ...state, problemList: action.payload, isLoading: false }
    case GetAllProblemFailed.type:
      return { ...state, isLoading: false }
    case GetUsers.type:
      return { ...state, isLoading: true }
    case GetUsersSuccess.type:
      return { ...state, userList: action.payload, isLoading: false }
    case GetUsersFailed.type:
      return { ...state, isLoading: false }
    case SearchRecipes.type:
      return {
        ...state,
        isLoading: true
      }
    case SearchRecipesSuccess.type:
      return {
        ...state,
        isLoading: false,
        recipeList: action.payload.rows
      }
    case SearchRecipesFailed.type:
      return {
        ...state,
        isLoading: false
      }
    case SetCurrentPage.type:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        detailPage: action.payload.detailPage
      }
    case SignOut.type:
      return initialState
    default:
      return state
  }
}
