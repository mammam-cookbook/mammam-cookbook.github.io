import { connectRouter } from 'connected-react-router'
import { createReducer } from 'pages/CreateRecipe/redux/reducer'
import { dashboardReducer } from 'pages/Dashboard/redux/reducer'
import { profileReducer } from 'pages/Profile/redux/reducer'
import { recipeReducer } from 'pages/Recipe/redux/reducer'
import { authReducer } from 'pages/SignIn/redux/reducer'
import { combineReducers } from 'redux'
import { history } from 'ultis/functions'

export const rootReducer = combineReducers({
  Auth: authReducer,
  Create: createReducer,
  Recipe: recipeReducer,
  Profile: profileReducer,
  Dashboard: dashboardReducer,
  router: connectRouter(history)
})
