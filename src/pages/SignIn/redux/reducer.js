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
  GetProfileSuccess,
  ResetReducer,
  SignInRequestSuccess,
  SignOut,
  UpdateProfile,
  UpdateProfileFailed,
  UpdateProfileSuccess
} from './actions'
const initialState = {
  token: null,
  refreshToken: null,
  user: null,
  isLoading: false,
  prevLogin: null,
  language: i18n.language
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SignInRequestSuccess.type:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        prevLogin: new Date().getTime()
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
    case SignOut.type:
      return initialState
    case ResetReducer.type:
      return initialState
    default:
      return state
  }
}
