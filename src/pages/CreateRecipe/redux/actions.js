import { defineAction } from 'redux-typed-actions'

export const SearchIngredient = defineAction('SEARCH_INGREDIENT_REQUEST')
export const SearchIngredientSuccess = defineAction('SEARCH_INGREDIENT_SUCCESS')
export const SearchIngredientFailed = defineAction('SEARCH_INGREDIENT_FAILED')
