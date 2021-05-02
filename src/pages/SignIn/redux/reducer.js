import {
  ChangePassword,
  ChangePasswordFailed,
  ChangePasswordSuccess,
  GetProfile,
  GetProfileFailed,
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
  isLoadingProfile: false,
  prevLogin: null
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
    case GetProfile.type:
      return { ...state, isLoadingProfile: true }
    case GetProfileSuccess.type:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isLoadingProfile: false
      }
    case GetProfileFailed.type:
      return { ...state, isLoadingProfile: false }
    case ChangePassword.type:
      return { ...state, isLoading: true }
    case ChangePasswordSuccess.type:
      return { ...state, isLoading: false }
    case ChangePasswordFailed.type:
      return { ...state, isLoading: false }
    case SignOut.type:
      return initialState
    case ResetReducer.type:
      return initialState
    default:
      return state
  }
}
