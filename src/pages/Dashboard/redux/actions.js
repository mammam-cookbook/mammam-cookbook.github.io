import { defineAction } from 'redux-typed-actions'

export const SetCurrentPage = defineAction('SET_CURRENT_PAGE')

export const GetAllCategories = defineAction('GET_CATEGORIES_REQUEST')
export const GetAllCategoriesSuccess = defineAction('GET_CATEGORIES_SUCCESS')
export const GetAllCategoriesFailed = defineAction('GET_CATEGORIES_FAILED')

export const AddCategory = defineAction('ADD_CATEGORY_REQUEST')
export const AddCategorySuccess = defineAction('ADD_CATEGORY_SUCCESS')
export const AddCategoryFailed = defineAction('ADD_CATEGORY_FAILED')

export const UpdateCategory = defineAction('UPDATE_CATEGORY_REQUEST')
export const UpdateCategorySuccess = defineAction('UPDATE_CATEGORY_SUCCESS')
export const UpdateCategoryFailed = defineAction('UPDATE_CATEGORY_FAILED')

export const DeleteCategory = defineAction('DELETE_CATEGORY_REQUEST')
export const DeleteCategorySuccess = defineAction('DELETE_CATEGORY_SUCCESS')
export const DeleteCategoryFailed = defineAction('DELETE_CATEGORY_FAILED')

export const GetUsers = defineAction('GET_USERS_REQUEST')
export const GetUsersSuccess = defineAction('GET_USERS_SUCCESS')
export const GetUsersFailed = defineAction('GET_USERS_FAILED')

export const GetUserProfile = defineAction('GET_USER_PROFILE_REQUEST')
export const GetUserProfileSuccess = defineAction('GET_USER_PROFILE_SUCCESS')
export const GetUserProfileFailed = defineAction('GET_USER_PROFILE_FAILED')

export const GetAllProblem = defineAction('GET_PROBLEMS_REQUEST')
export const GetAllProblemSuccess = defineAction('GET_PROBLEMS_SUCCESS')
export const GetAllProblemFailed = defineAction('GET_PROBLEMS_FAILED')

export const AddProblem = defineAction('ADD_PROBLEM_REQUEST')
export const AddProblemSuccess = defineAction('ADD_PROBLEM_SUCCESS')
export const AddProblemFailed = defineAction('ADD_PROBLEM_FAILED')

export const UpdateProblem = defineAction('UPDATE_PROBLEM_REQUEST')
export const UpdateProblemSuccess = defineAction('UPDATE_PROBLEM_SUCCESS')
export const UpdateProblemFailed = defineAction('UPDATE_PROBLEM_FAILED')

export const DeleteProblem = defineAction('DELETE_PROBLEM_REQUEST')
export const DeleteProblemSuccess = defineAction('DELETE_PROBLEM_SUCCESS')
export const DeleteProblemFailed = defineAction('DELETE_PROBLEM_FAILED')
