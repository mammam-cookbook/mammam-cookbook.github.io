import { defineAction } from 'redux-typed-actions'

export const SearchRecipes = defineAction('SEARCH_RECIPE_REQUEST')
export const SearchRecipesSuccess = defineAction('SEARCH_RECIPE_SUCCESS')
export const SearchRecipesFailed = defineAction('SEARCH_RECIPE_FAILED')
