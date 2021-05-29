import { defineAction } from 'redux-typed-actions'

export const GetHomeRecipe = defineAction('GET_HOME_RECIPE_REQUEST')
export const GetHomeRecipeSuccess = defineAction('GET_HOME_RECIPE_SUCCESS')
export const GetHomeRecipeFailed = defineAction('GET_HOME_RECIPE_FAILED')
