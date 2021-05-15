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

export const GetAllCourses = defineAction('GET_ALL_COURSES_REQUEST')
export const GetAllCoursesSuccess = defineAction('GET_ALL_COURSES_SUCCESS')
export const GetAllCoursesFailed = defineAction('GET_ALL_COURSES_FAILED')

export const DeleteCourse = defineAction('DELETE_COURSE_REQUEST')
export const DeleteCourseSuccess = defineAction('DELETE_COURSE_SUCCESS')
export const DeleteCourseFailed = defineAction('DELETE_COURSE_FAILED')
