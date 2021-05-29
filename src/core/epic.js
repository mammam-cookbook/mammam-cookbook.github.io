import { createEpics } from 'pages/CreateRecipe/redux/epics'
import { dashboardEpics } from 'pages/Dashboard/redux/epics'
import { homeEpics } from 'pages/Home/redux/epics'
import { profileEpics } from 'pages/Profile/redux/epics'
import { recipeEpics } from 'pages/Recipe/redux/epics'
import { searchEpics } from 'pages/SearchRecipe/redux/epics'
import { authEpics } from 'pages/SignIn/redux/epics'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics(
  authEpics,
  createEpics,
  recipeEpics,
  profileEpics,
  dashboardEpics,
  searchEpics,
  homeEpics
)
