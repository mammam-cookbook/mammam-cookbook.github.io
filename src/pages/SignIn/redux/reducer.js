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
  GetNotificationSuccess,
  GetProfileSuccess,
  RefreshTokenSuccess,
  ResetReducer,
  SignInRequestSuccess,
  SignOut,
  UpdateCurrentOpenNoti,
  UpdateProfile,
  UpdateProfileFailed,
  UpdateProfileSuccess
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
  recentOpenNoti: moment().valueOf()
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
    case GetNotificationSuccess.type:
      return {
        ...state,
        notifications: action.payload?.notifications?.rows || []
      }
    case UpdateCurrentOpenNoti.type:
      return {
        ...state,
        recentOpenNoti: moment().valueOf()
      }
    case SignOut.type:
      return { ...initialState, recentOpenNoti: state.recentOpenNoti }
    case ResetReducer.type:
      return { ...initialState, recentOpenNoti: state.recentOpenNoti }
    default:
      return state
  }
}
