import GlobalModal from 'components/GlobalModal'
import { replace } from 'connected-react-router'
import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { history, MODAL_TYPE, ROLES } from 'ultis/functions'
import i18n from 'ultis/i18n'
import {
  ChangePassword,
  ChangePasswordFailed,
  ChangePasswordSuccess,
  CreatePassword,
  CreatePasswordFailed,
  CreatePasswordSuccess,
  GetProfile,
  GetProfileFailed,
  GetProfileSuccess,
  GetWatchlist,
  GetWatchlistFailed,
  GetWatchlistSuccess,
  ResetPassword,
  ResetPasswordFailed,
  ResetPasswordSuccess,
  SignInRequest,
  SignInRequestFailed,
  SignInRequestSuccess,
  SignOut,
  SignUpRequest,
  SignUpRequestFailed,
  SignUpRequestSuccess,
  UpdateProfile,
  UpdateProfileFailed,
  UpdateProfileSuccess
} from './actions'

const signinEpic$ = action$ =>
  action$.pipe(
    ofType(SignInRequest.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'auth',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return SignInRequestSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            i18n.t('common.signinErr')
          )
          return SignInRequestFailed.get(result.data.err)
        }),
        catchError(error => {
          return SignInRequestFailed.get(error)
        })
      )
    })
  )

const signupEpic$ = action$ =>
  action$.pipe(
    ofType(SignUpRequest.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'user',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            if (action.payload?.role === ROLES.MOD) {
              // store.dispatch(GetUsers.get({ role: ROLES.TEACHER }))
            } else {
              store.dispatch(replace('/signin', { from: '/signup' }))
              GlobalModal.alertMessage(
                i18n.t('common.information'),
                i18n.t('common.signupSuccess')
              )
            }
            return SignUpRequestSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return SignUpRequestFailed.get(result)
        }),
        catchError(error => {
          return SignUpRequestFailed.get(error)
        })
      )
    })
  )

const changePassEpic$ = action$ =>
  action$.pipe(
    ofType(ChangePassword.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: `users/${action.payload.id}/changePassword`,
        param: action.payload.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              'Change password succeed. Please sign in to continue.',
              MODAL_TYPE.NORMAL,
              () => {
                store.dispatch(SignOut.get())
                history.push({
                  pathname: '/signin',
                  state: { from: `/profile` }
                })
              }
            )
            return ChangePasswordSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return ChangePasswordFailed.get(result)
        }),
        catchError(error => {
          return ChangePasswordFailed.get(error)
        })
      )
    })
  )

const getProfileEpic$ = action$ =>
  action$.pipe(
    ofType(GetProfile.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `users/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetProfileSuccess.get(result.data)
          }
          return GetProfileFailed.get(result)
        }),
        catchError(error => {
          return GetProfileFailed.get(error)
        })
      )
    })
  )

const getWatchlistEpic$ = action$ =>
  action$.pipe(
    ofType(GetWatchlist.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `users/${action.payload}/watchlist`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetWatchlistSuccess.get(result.data)
          }
          return GetWatchlistFailed.get(result)
        }),
        catchError(error => {
          return GetWatchlistFailed.get(error)
        })
      )
    })
  )

const updateUserProfileEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateProfile.type),
    exhaustMap(action => {
      return request({
        method: 'PATCH',
        url: `users/${action.payload.id}`,
        param: action.payload.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetProfile.get(action.payload.id))
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              'Update profile succeed.'
            )
            return UpdateProfileSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return UpdateProfileFailed.get(result)
        }),
        catchError(error => {
          return UpdateProfileFailed.get(error)
        })
      )
    })
  )

const resetPasswordEpic$ = action$ =>
  action$.pipe(
    ofType(ResetPassword.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'auth/forgot-password',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              i18n.t('common.forgotPassSuccess'),
              MODAL_TYPE.NORMAL,
              () => store.dispatch(replace('/'))
            )
            return ResetPasswordSuccess.get(result.data)
          }
          GlobalModal.alertMessage()
          return ResetPasswordFailed.get(result)
        }),
        catchError(error => {
          return ResetPasswordFailed.get(error)
        })
      )
    })
  )

const createPasswordEpic$ = action$ =>
  action$.pipe(
    ofType(CreatePassword.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'auth/new-password',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              i18n.t('common.updatePassSuccess'),
              MODAL_TYPE.NORMAL,
              () => store.dispatch(replace('/signin'))
            )
            return CreatePasswordSuccess.get(result.data)
          }
          GlobalModal.alertMessage()
          return CreatePasswordFailed.get(result)
        }),
        catchError(error => {
          return CreatePasswordFailed.get(error)
        })
      )
    })
  )

export const authEpics = combineEpics(
  signinEpic$,
  signupEpic$,
  resetPasswordEpic$,
  createPasswordEpic$,
  changePassEpic$,
  updateUserProfileEpic$,
  getProfileEpic$,
  getWatchlistEpic$
)
