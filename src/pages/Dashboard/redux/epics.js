import GlobalModal from 'components/GlobalModal'
import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import i18n from 'ultis/i18n'
import {
  AddCategory,
  AddCategoryFailed,
  AddCategorySuccess,
  DeleteCategory,
  DeleteCategoryFailed,
  DeleteCategorySuccess,
  DeleteCourse,
  DeleteCourseFailed,
  DeleteCourseSuccess,
  GetAllCategories,
  GetAllCategoriesFailed,
  GetAllCategoriesSuccess,
  GetAllCourses,
  GetAllCoursesFailed,
  GetAllCoursesSuccess,
  GetUserProfile,
  GetUserProfileFailed,
  GetUserProfileSuccess,
  GetUsers,
  GetUsersFailed,
  GetUsersSuccess,
  UpdateCategory,
  UpdateCategoryFailed,
  UpdateCategorySuccess
} from './actions'

const getCategoriesEpic$ = action$ =>
  action$.pipe(
    ofType(GetAllCategories.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'category'
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetAllCategoriesSuccess.get(
              result.data?.categories?.categoriesResult
            )
          }
          return GetAllCategoriesFailed.get(result)
        }),
        catchError(error => {
          return GetAllCategoriesFailed.get(error)
        })
      )
    })
  )

const addCategoryEpic$ = action$ =>
  action$.pipe(
    ofType(AddCategory.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'category',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetAllCategories.get())
            return AddCategorySuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return AddCategoryFailed.get(result)
        }),
        catchError(error => {
          return AddCategoryFailed.get(error)
        })
      )
    })
  )

const updateCategoryEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateCategory.type),
    exhaustMap(action => {
      return request({
        method: 'PUT',
        url: `category/${action.payload.id}`,
        param: action.payload.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetAllCategories.get())
            return UpdateCategorySuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return UpdateCategoryFailed.get(result)
        }),
        catchError(error => {
          return UpdateCategoryFailed.get(error)
        })
      )
    })
  )

const deleteCategoryEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteCategory.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `category/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetAllCategories.get())
            return DeleteCategorySuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return DeleteCategoryFailed.get(result)
        }),
        catchError(error => {
          return DeleteCategoryFailed.get(error)
        })
      )
    })
  )

const deleteCourseEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteCourse.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `course/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetAllCourses.get())
            const currentUser = store.getState().Dashboard.userDetail
            if (currentUser) {
              store.dispatch(GetUserProfile.get(currentUser.id))
            }
            return DeleteCourseSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return DeleteCourseFailed.get(result)
        }),
        catchError(error => {
          return DeleteCourseFailed.get(error)
        })
      )
    })
  )

const getUsersEpic$ = action$ =>
  action$.pipe(
    ofType(GetUsers.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'users',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetUsersSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return GetUsersFailed.get(result)
        }),
        catchError(error => {
          return GetUsersFailed.get(error)
        })
      )
    })
  )

const getUserProfileEpic$ = action$ =>
  action$.pipe(
    ofType(GetUserProfile.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `users/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetUserProfileSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return GetUserProfileFailed.get(result)
        }),
        catchError(error => {
          return GetUserProfileFailed.get(error)
        })
      )
    })
  )

const getCourseListEpic$ = action$ =>
  action$.pipe(
    ofType(GetAllCourses.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `course`,
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetAllCoursesSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return GetAllCoursesFailed.get(result)
        }),
        catchError(error => {
          return GetAllCoursesFailed.get(error)
        })
      )
    })
  )

export const dashboardEpics = combineEpics(
  getCategoriesEpic$,
  addCategoryEpic$,
  updateCategoryEpic$,
  deleteCategoryEpic$,
  getUsersEpic$,
  getUserProfileEpic$,
  getCourseListEpic$,
  deleteCourseEpic$
)
