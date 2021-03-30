import GlobalModal from 'components/GlobalModal'
import { replace } from 'connected-react-router'
import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { history, MODAL_TYPE, ROLES } from 'ultis/functions'
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
  RefreshToken,
  RefreshTokenFailed,
  RefreshTokenSuccess,
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
  UpdateProfileSuccess,
  VerifyEmail,
  VerifyEmailFailed,
  VerifyEmailSuccess
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
            'Information',
            'Email or password may not correct. Please try again.'
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
                'Information',
                'Sign up succeed. Please sign in to continue.'
              )
            }
            return SignUpRequestSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
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
              'Information',
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
          GlobalModal.alertMessage('Information', result.data?.message)
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
            GlobalModal.alertMessage('Information', 'Update profile succeed.')
            return UpdateProfileSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return UpdateProfileFailed.get(result)
        }),
        catchError(error => {
          return UpdateProfileFailed.get(error)
        })
      )
    })
  )

const refreshTokenEpic$ = action$ =>
  action$.pipe(
    ofType(RefreshToken.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'auth/refresh',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return RefreshTokenSuccess.get(result.data)
          }
          GlobalModal.alertMessage()
          return RefreshTokenFailed.get(result)
        }),
        catchError(error => {
          return RefreshTokenFailed.get(error)
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
        url: 'auth/resetPassword',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              'Information',
              result.data.message,
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
        url: 'auth/createPassword',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              'Information',
              result.data.message,
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

const verifyEmailEpic$ = action$ =>
  action$.pipe(
    ofType(VerifyEmail.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'auth/verifyEmail',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              'Information',
              result.data.message,
              MODAL_TYPE.NORMAL,
              () => store.dispatch(replace('/'))
            )
            return VerifyEmailSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return VerifyEmailFailed.get(result)
        }),
        catchError(error => {
          return VerifyEmailFailed.get(error)
        })
      )
    })
  )

export const authEpics = combineEpics(
  signinEpic$,
  signupEpic$,
  resetPasswordEpic$,
  createPasswordEpic$,
  verifyEmailEpic$,
  changePassEpic$,
  updateUserProfileEpic$,
  getProfileEpic$,
  getWatchlistEpic$,
  refreshTokenEpic$
)
