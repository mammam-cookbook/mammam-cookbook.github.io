import { notification } from 'antd'
import GlobalModal from 'components/GlobalModal'
import { replace } from 'connected-react-router'
import { store } from 'core/store'
import { PROFILE_PAGE } from 'pages/Profile/constant'
import {
  DeleteRecipeInCollectionFailed,
  GetFollowing
} from 'pages/Profile/redux/actions'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import {
  getNotiContent,
  history,
  MODAL_TYPE,
  NOTI_TYPE,
  ROLES
} from 'ultis/functions'
import i18n from 'ultis/i18n'
import { socketService } from 'ultis/socket'
import {
  ChangePassword,
  ChangePasswordFailed,
  ChangePasswordSuccess,
  CreatePassword,
  CreatePasswordFailed,
  CreatePasswordSuccess,
  DeleteRecipeInMenu,
  DeleteRecipeInMenuSuccess,
  GetMenu,
  GetMenuFailed,
  GetMenuSuccess,
  GetNotification,
  GetNotificationFailed,
  GetNotificationSuccess,
  GetProfile,
  GetProfileFailed,
  GetProfileSuccess,
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
  SignOutFailed,
  SignOutSuccess,
  SignUpRequest,
  SignUpRequestFailed,
  SignUpRequestSuccess,
  UpdateNotification,
  UpdateNotificationFailed,
  UpdateNotificationSuccess,
  UpdateProfile,
  UpdateProfileFailed,
  UpdateProfileSuccess,
  UpdateSocket
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
            if (result.data?.user) {
              store.dispatch(GetFollowing.get(result.data?.user?.id))
            }
            if (result.data?.token) {
              socketService
                .connect(result.data?.token)
                .then(socket => {
                  store.dispatch(UpdateSocket.get(socket))
                  socket.on('newNotification', data => {
                    const noti = data?.notification
                    const NOTI_TEXT = {
                      [NOTI_TYPE.LIKE]: i18n.t('notification.liked'),
                      [NOTI_TYPE.COMMENT]: i18n.t('notification.commented'),
                      [NOTI_TYPE.FOLLOW]: i18n.t('notification.followed'),
                      [NOTI_TYPE.REPLY]: i18n.t('notification.replied')
                    }
                    store.dispatch(GetNotification.get())
                    notification.open({
                      message: `${noti?.sender?.name} ${
                        NOTI_TEXT[noti?.type]
                      } ${getNotiContent(noti)}`,
                      onClick: () => {
                        if (
                          noti.type === NOTI_TYPE.LIKE ||
                          noti.type === NOTI_TYPE.COMMENT ||
                          noti.type === NOTI_TYPE.REPLY
                        ) {
                          if (noti?.recipe) {
                            history.push(`/recipe/${noti?.recipe?.id}`)
                          }
                        } else if (noti.type === NOTI_TYPE.FOLLOW) {
                          history.push(
                            `/profile?page=${PROFILE_PAGE.RECIPE}&user=${noti?.sender.id}`
                          )
                        }
                        store.dispatch(
                          UpdateNotification.get({
                            ...noti,
                            read: true
                          })
                        )
                      }
                    })
                  })
                })
                .catch(err => {
                  console.log({ err })
                })
            }
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
        url: `auth/change-password`,
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              i18n.t('createPass.changePassSuccess'),
              MODAL_TYPE.NORMAL,
              () => {
                store.dispatch(SignOut.get())
              }
            )
            return ChangePasswordSuccess.get(result.data)
          } else if (result.status === 400) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              i18n.t('createPass.wrongOldPass')
            )
            return ChangePasswordFailed.get(result.data)
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
        url: `user/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetProfileSuccess.get(result.data?.user)
          }
          return GetProfileFailed.get(result)
        }),
        catchError(error => {
          return GetProfileFailed.get(error)
        })
      )
    })
  )

const getMenuEpic$ = action$ =>
  action$.pipe(
    ofType(GetMenu.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `menu`,
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetMenuSuccess.get(result.data?.result)
          }
          return GetMenuFailed.get(result)
        }),
        catchError(error => {
          return GetMenuFailed.get(error)
        })
      )
    })
  )

const deleteRecipeInMenuEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteRecipeInMenu.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `menu/${action.payload?.id}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetMenu.get({
                startDate: action.payload?.start?.format(),
                endDate: action.payload?.end?.format()
              })
            )
            return DeleteRecipeInMenuSuccess.get(result.data)
          }
          return DeleteRecipeInCollectionFailed.get(result)
        }),
        catchError(error => {
          return DeleteRecipeInCollectionFailed.get(error)
        })
      )
    })
  )

const updateUserProfileEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateProfile.type),
    exhaustMap(action => {
      return request({
        method: 'PUT',
        url: `user/${action.payload.id}`,
        param: action.payload.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetProfile.get(action.payload.id))
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              i18n.t('profile.updateProfileSucceed')
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

const refreshTokenEpic$ = action$ =>
  action$.pipe(
    ofType(RefreshToken.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'auth/refresh-token',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return RefreshTokenSuccess.get(result.data)
          }
          return RefreshTokenFailed.get(result)
        }),
        catchError(error => {
          return RefreshTokenFailed.get(error)
        })
      )
    })
  )

const updateNotificationEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateNotification.type),
    exhaustMap(action => {
      return request({
        method: 'PUT',
        url: `notification/${action.payload?.id}`,
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetNotification.get())
            return UpdateNotificationSuccess.get(result.data)
          }
          return UpdateNotificationFailed.get(result)
        }),
        catchError(error => {
          return UpdateNotificationFailed.get(error)
        })
      )
    })
  )

const getNotiListEpic$ = action$ =>
  action$.pipe(
    ofType(GetNotification.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'notification'
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetNotificationSuccess.get(result.data)
          }
          return GetNotificationFailed.get(result)
        }),
        catchError(error => {
          return GetNotificationFailed.get(error)
        })
      )
    })
  )

const logoutEpic$ = action$ =>
  action$.pipe(
    ofType(SignOut.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: `auth/logout`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return SignOutSuccess.get(result.data)
          }
          return SignOutFailed.get(result)
        }),
        catchError(error => {
          return SignOutFailed.get(error)
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
  getMenuEpic$,
  deleteRecipeInMenuEpic$,
  refreshTokenEpic$,
  getNotiListEpic$,
  updateNotificationEpic$,
  logoutEpic$
)
