import moment from 'moment'
import {
  GetFollowerSuccess,
  GetFollowingSuccess
} from 'pages/Profile/redux/actions'
import i18n from 'ultis/i18n'
import {
  ChangeLanguage,
  ChangePassword,
  ChangePasswordFailed,
  ChangePasswordSuccess,
  GetMenu,
  GetMenuFailed,
  GetMenuSuccess,
  GetNotification,
  GetNotificationFailed,
  GetNotificationSuccess,
  GetProfileSuccess,
  RefreshTokenSuccess,
  ResetReducer,
  SignInRequestSuccess,
  SignOutFailed,
  SignOutSuccess,
  UpdateCurrentOpenNoti,
  UpdateProfile,
  UpdateProfileFailed,
  UpdateProfileSuccess,
  UpdateSocket
} from './actions'
const initialState = {
  token: null,
  tokenExp: null,
  refreshToken: null,
  refreshTokenExp: null,
  user: null,
  isLoading: false,
  prevLogin: null,
  isLoadingMenu: false,
  menu: [],
  language: i18n.language,
  notifications: [],
  isLoadingNoti: false,
  totalNoti: 0,
  currentOffset: 0,
  recentOpenNoti: moment().valueOf(),
  pastUserOpenNoti: {},
  socket: null
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SignInRequestSuccess.type:
      return {
        ...state,
        token: action.payload.token,
        tokenExp: action.payload?.tokenExp,
        refreshToken: action.payload?.refreshToken,
        refreshTokenExp: action.payload?.refreshTokenExp,
        user: action.payload.user,
        recentOpenNoti:
          state.pastUserOpenNoti &&
          state.pastUserOpenNoti?.hasOwnProperty(action.payload.user?.id)
            ? state.pastUserOpenNoti[action.payload.user?.id]
            : moment().valueOf(),
        prevLogin: new Date().getTime()
      }
    case RefreshTokenSuccess.type: {
      return {
        ...state,
        token: action.payload.token,
        tokenExp: moment().unix() + 86400
      }
    }
    case UpdateProfile.type:
      return { ...state, isLoading: true }
    case UpdateProfileSuccess.type:
      return { ...state, isLoading: false }
    case UpdateProfileFailed.type:
      return { ...state, isLoading: false }
    case ChangePassword.type:
      return { ...state, isLoading: true }
    case ChangePasswordSuccess.type:
      return { ...state, isLoading: false }
    case ChangePasswordFailed.type:
      return { ...state, isLoading: false }
    case ChangeLanguage.type:
      return { ...state, language: action.payload }
    case GetProfileSuccess.type:
      return {
        ...state,
        user:
          state.user != null && state.user?.id === action.payload?.id
            ? { ...state.user, ...action.payload }
            : state.user
      }
    case GetFollowingSuccess.type:
      return {
        ...state,
        user:
          state.user != null && state.user?.id === action.payload?.userId
            ? { ...state.user, following: [...action.payload?.data] }
            : state.user
      }
    case GetFollowerSuccess.type:
      return {
        ...state,
        user:
          state.user != null && state.user?.id === action.payload?.userId
            ? { ...state.user, follower: [...action.payload?.data] }
            : state.user
      }
    case GetMenu.type:
      return { ...state, isLoadingMenu: true }
    case GetMenuSuccess.type:
      return { ...state, isLoadingMenu: false, menu: action.payload }
    case GetMenuFailed.type:
      return { ...state, isLoadingMenu: false }
    case GetNotification.type:
      return { ...state, isLoadingNoti: true }
    case GetNotificationFailed.type:
      return { ...state, isLoadingNoti: false }
    case GetNotificationSuccess.type:
      return {
        ...state,
        totalNoti: action.payload?.notifications?.count || 0,
        notifications:
          action.payload?.offset === 0
            ? action.payload?.notifications?.rows || []
            : state.notifications?.concat(
                action.payload?.notifications?.rows || []
              ),
        currentOffset: action.payload?.offset,
        isLoadingNoti: false
      }
    case UpdateCurrentOpenNoti.type:
      const now = moment().valueOf()
      return {
        ...state,
        recentOpenNoti: now,
        pastUserOpenNoti: { ...state.pastUserOpenNoti, [state.user?.id]: now }
      }
    case UpdateSocket.type:
      return { ...state, socket: action?.payload }
    case SignOutSuccess.type:
      if (state.socket && state.socket.connected) {
        state.socket?.disconnect()
      }
      return {
        ...initialState,
        recentOpenNoti: state.recentOpenNoti,
        pastUserOpenNoti: state.pastUserOpenNoti
      }
    case SignOutFailed.type:
      if (state.socket && state.socket.connected) {
        state.socket?.disconnect()
      }
      return {
        ...initialState,
        recentOpenNoti: state.recentOpenNoti,
        pastUserOpenNoti: state.pastUserOpenNoti
      }
    case ResetReducer.type:
      return {
        ...initialState,
        recentOpenNoti: state.recentOpenNoti,
        pastUserOpenNoti: state.pastUserOpenNoti
      }
    default:
      return state
  }
}
