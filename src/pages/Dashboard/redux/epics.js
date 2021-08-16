import GlobalModal from 'components/GlobalModal'
import { store } from 'core/store'
import { SearchUsers } from 'pages/SearchRecipe/redux/actions'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { LIMIT_ITEMS } from 'ultis/functions'
import i18n from 'ultis/i18n'
import {
  AddCategory,
  AddCategoryFailed,
  AddCategorySuccess,
  AddProblem,
  AddProblemFailed,
  AddProblemSuccess,
  AddReport,
  AddReportFailed,
  AddReportSuccess,
  BanUser,
  BanUserFailed,
  BanUserSuccess,
  DeleteCategory,
  DeleteCategoryFailed,
  DeleteCategorySuccess,
  DeleteProblem,
  DeleteProblemFailed,
  DeleteProblemSuccess,
  DeleteUser,
  DeleteUserFailed,
  DeleteUserSuccess,
  GetAllCategories,
  GetAllCategoriesFailed,
  GetAllCategoriesSuccess,
  GetAllProblem,
  GetAllProblemFailed,
  GetAllProblemSuccess,
  GetAllReport,
  GetAllReportFailed,
  GetAllReportSuccess,
  UnBanUser,
  UnBanUserFailed,
  UnBanUserSuccess,
  UpdateCategory,
  UpdateCategoryFailed,
  UpdateCategorySuccess,
  UpdateProblem,
  UpdateProblemFailed,
  UpdateProblemSuccess
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
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
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
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
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
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return DeleteCategoryFailed.get(result)
        }),
        catchError(error => {
          return DeleteCategoryFailed.get(error)
        })
      )
    })
  )

const getProblemsEpic$ = action$ =>
  action$.pipe(
    ofType(GetAllProblem.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'problem'
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetAllProblemSuccess.get(result.data?.problem?.rows)
          }
          return GetAllProblemFailed.get(result)
        }),
        catchError(error => {
          return GetAllProblemFailed.get(error)
        })
      )
    })
  )

const addProblemEpic$ = action$ =>
  action$.pipe(
    ofType(AddProblem.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'problem',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetAllProblem.get())
            return AddProblemSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return AddProblemFailed.get(result)
        }),
        catchError(error => {
          return AddProblemFailed.get(error)
        })
      )
    })
  )

const updateProblemEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateProblem.type),
    exhaustMap(action => {
      return request({
        method: 'PUT',
        url: `problem/${action.payload.id}`,
        param: action.payload.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetAllProblem.get())
            return UpdateProblemSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return UpdateProblemFailed.get(result)
        }),
        catchError(error => {
          return UpdateProblemFailed.get(error)
        })
      )
    })
  )

const deleteProblemEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteProblem.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `problem`,
        param: {
          id: action?.payload
        }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetAllProblem.get())
            return DeleteProblemSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return DeleteProblemFailed.get(result)
        }),
        catchError(error => {
          return DeleteProblemFailed.get(error)
        })
      )
    })
  )

const deleteUserEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteUser.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `admin/user`,
        param: {
          user_id: action?.payload
        }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              SearchUsers.get({ keyword: '', limit: LIMIT_ITEMS, offset: 0 })
            )
            return DeleteUserSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return DeleteUserFailed.get(result)
        }),
        catchError(error => {
          return DeleteUserFailed.get(error)
        })
      )
    })
  )

const banUserEpic$ = action$ =>
  action$.pipe(
    ofType(BanUser.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'admin/ban',
        param: { user_id: action.payload }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              SearchUsers.get({ keyword: '', limit: LIMIT_ITEMS, offset: 0 })
            )
            return BanUserSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return BanUserFailed.get(result)
        }),
        catchError(error => {
          return BanUserFailed.get(error)
        })
      )
    })
  )

const unBanUserEpic$ = action$ =>
  action$.pipe(
    ofType(UnBanUser.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'admin/unban',
        param: { user_id: action.payload }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              SearchUsers.get({ keyword: '', limit: LIMIT_ITEMS, offset: 0 })
            )
            return UnBanUserSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return UnBanUserFailed.get(result)
        }),
        catchError(error => {
          return UnBanUserFailed.get(error)
        })
      )
    })
  )

const getReportsEpic$ = action$ =>
  action$.pipe(
    ofType(GetAllReport.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'report'
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetAllReportSuccess.get(result.data?.report?.rows)
          }
          return GetAllReportFailed.get(result)
        }),
        catchError(error => {
          return GetAllReportFailed.get(error)
        })
      )
    })
  )

const addReportEpic$ = action$ =>
  action$.pipe(
    ofType(AddReport.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'report',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              'Báo cáo thành công. Chúng tôi sẽ xem xét báo cáo của bạn.'
            )
            return AddReportSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return AddReportFailed.get(result)
        }),
        catchError(error => {
          return AddReportFailed.get(error)
        })
      )
    })
  )

export const dashboardEpics = combineEpics(
  getCategoriesEpic$,
  addCategoryEpic$,
  updateCategoryEpic$,
  deleteCategoryEpic$,
  deleteProblemEpic$,
  updateProblemEpic$,
  addProblemEpic$,
  getProblemsEpic$,
  banUserEpic$,
  unBanUserEpic$,
  deleteUserEpic$,
  addReportEpic$,
  getReportsEpic$
)
