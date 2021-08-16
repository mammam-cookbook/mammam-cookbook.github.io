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

export const BanUser = defineAction('BAN_USER_REQUEST')
export const BanUserSuccess = defineAction('BAN_USER_SUCCESS')
export const BanUserFailed = defineAction('BAN_USER_FAILED')

export const UnBanUser = defineAction('UNBAN_USER_REQUEST')
export const UnBanUserSuccess = defineAction('UNBAN_USER_SUCCESS')
export const UnBanUserFailed = defineAction('UNBAN_USER_FAILED')

export const DeleteUser = defineAction('DELETE_USER_REQUEST')
export const DeleteUserSuccess = defineAction('DELETE_USER_SUCCESS')
export const DeleteUserFailed = defineAction('DELETE_USER_FAILED')
export const GetAllReport = defineAction('GET_REPORTS_REQUEST')
export const GetAllReportSuccess = defineAction('GET_REPORTS_SUCCESS')
export const GetAllReportFailed = defineAction('GET_REPORTS_FAILED')

export const AddReport = defineAction('ADD_REPORT_REQUEST')
export const AddReportSuccess = defineAction('ADD_REPORT_SUCCESS')
export const AddReportFailed = defineAction('ADD_REPORT_FAILED')
