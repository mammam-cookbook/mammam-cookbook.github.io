import { PAGE } from 'pages/Dashboard/constant'
import {
  SearchRecipes,
  SearchRecipesFailed,
  SearchRecipesSuccess,
  SearchUsers,
  SearchUsersFailed,
  SearchUsersSuccess
} from 'pages/SearchRecipe/redux/actions'
import { SignOut } from 'pages/SignIn/redux/actions'
import {
  GetAllCategories,
  GetAllCategoriesFailed,
  GetAllCategoriesSuccess,
  GetAllProblem,
  GetAllProblemFailed,
  GetAllProblemSuccess,
  GetAllReport,
  GetAllReportFailed,
  GetAllReportSuccess,
  SetCurrentPage
} from './actions'
const initialState = {
  isLoading: false,
  isLoadingDashboard: false,
  currentPage: PAGE.DASHBOARD,
  detailPage: null,
  categoryList: [],
  problemList: [],
  reportList: [],
  userList: [],
  userDetail: null,
  recipeList: [],
  currentUserOffset: 0,
  canLoadMoreUser: true,
  currentRecipeOffset: 0,
  canLoadMoreRecipe: true,
  isLoadingUser: false,
  isLoadingRecipe: false
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
    case GetAllReport.type:
      return { ...state, isLoading: true }
    case GetAllReportSuccess.type:
      return { ...state, reportList: action.payload, isLoading: false }
    case GetAllReportFailed.type:
      return { ...state, isLoading: false }
    case SearchRecipes.type:
      return {
        ...state,
        isLoadingRecipe: true
      }
    case SearchRecipesSuccess.type:
      return {
        ...state,
        isLoadingRecipe: false,
        recipeList:
          action.payload?.currentOffset === 0
            ? action.payload.rows
            : state.recipeList.concat(action.payload.rows),
        currentRecipeOffset: action.payload?.currentOffset,
        canLoadMoreRecipe: action.payload?.currentOffset < action.payload?.total
      }
    case SearchRecipesFailed.type:
      return {
        ...state,
        isLoadingRecipe: false
      }
    case SearchUsers.type:
      return {
        ...state,
        isLoadingUser: true
      }
    case SearchUsersSuccess.type:
      return {
        ...state,
        isLoadingUser: false,
        userList:
          action.payload?.currentOffset === 0
            ? action.payload.rows
            : state.userList.concat(action.payload.rows),
        currentUserOffset: action.payload?.currentOffset,
        canLoadMoreUser: action.payload?.currentOffset < action.payload?.count
      }
    case SearchUsersFailed.type:
      return {
        ...state,
        isLoadingUser: false
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
