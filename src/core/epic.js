import { createEpics } from 'pages/CreateRecipe/redux/epics'
import { recipeEpics } from 'pages/Recipe/redux/epics'
import { authEpics } from 'pages/SignIn/redux/epics'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics(authEpics, createEpics, recipeEpics)
