import { defineAction } from 'redux-typed-actions'

export const SearchIngredient = defineAction('SEARCH_INGREDIENT_REQUEST')
export const SearchIngredientSuccess = defineAction('SEARCH_INGREDIENT_SUCCESS')
export const SearchIngredientFailed = defineAction('SEARCH_INGREDIENT_FAILED')

export const CreateRecipe = defineAction('CREATE_RECIPE')
export const CreateRecipeSuccess = defineAction('CREATE_RECIPE_SUCCESS')
export const CreateRecipeFailed = defineAction('CREATE_RECIPE_FAILED')

export const SaveDraft = defineAction('SAVE_DRAFT')
export const SaveDraftSuccess = defineAction('SAVE_DRAFT_SUCCESS')
export const SaveDraftFailed = defineAction('SAVE_DRAFT_FAILED')
