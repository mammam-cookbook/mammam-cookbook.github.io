import { defineAction } from 'redux-typed-actions'

export const SearchIngredient = defineAction('SEARCH_INGREDIENT_REQUEST')
export const SearchIngredientSuccess = defineAction('SEARCH_INGREDIENT_SUCCESS')
export const SearchIngredientFailed = defineAction('SEARCH_INGREDIENT_FAILED')

export const GetCategories = defineAction('GET_CATEGORIES_REQUEST')
export const GetCategoriesSuccess = defineAction('GET_CATEGORIES_SUCCESS')
export const GetCategoriesFailed = defineAction('GET_CATEGORIES_FAILED')

export const CreateRecipe = defineAction('CREATE_RECIPE')
export const CreateRecipeSuccess = defineAction('CREATE_RECIPE_SUCCESS')
export const CreateRecipeFailed = defineAction('CREATE_RECIPE_FAILED')
