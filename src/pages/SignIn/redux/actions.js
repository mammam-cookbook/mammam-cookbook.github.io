import { defineAction } from 'redux-typed-actions'

export const SignInRequest = defineAction('SIGNIN_REQUEST')
export const SignInRequestSuccess = defineAction('SIGNIN_REQUEST_SUCCESS')
export const SignInRequestFailed = defineAction('SIGNIN_REQUEST_FAILED')

export const SignUpRequest = defineAction('SIGNUP_REQUEST')
export const SignUpRequestSuccess = defineAction('SIGNUP_REQUEST_SUCCESS')
export const SignUpRequestFailed = defineAction('SIGNUP_REQUEST_FAILED')

export const ResetPassword = defineAction('RESET_PASSWORD_REQUEST')
export const ResetPasswordSuccess = defineAction('RESET_PASSWORD_SUCCESS')
export const ResetPasswordFailed = defineAction('RESET_PASSWORD_FAILED')

export const CreatePassword = defineAction('CREATE_PASSWORD_REQUEST')
export const CreatePasswordSuccess = defineAction('CREATE_PASSWORD_SUCCESS')
export const CreatePasswordFailed = defineAction('CREATE_PASSWORD_FAILED')

export const ChangePassword = defineAction('CHANGE_PASSWORD_REQUEST')
export const ChangePasswordSuccess = defineAction('CHANGE_PASSWORD_SUCCESS')
export const ChangePasswordFailed = defineAction('CHANGE_PASSWORD_FAILED')

export const GetProfile = defineAction('GET_PROFILE_REQUEST')
export const GetProfileSuccess = defineAction('GET_PROFILE_SUCCESS')
export const GetProfileFailed = defineAction('GET_PROFILE_FAILED')

export const UpdateProfile = defineAction('UPDATE_PROFILE_REQUEST')
export const UpdateProfileSuccess = defineAction('UPDATE_PROFILE_SUCCESS')
export const UpdateProfileFailed = defineAction('UPDATE_PROFILE_FAILED')

export const VerifyEmail = defineAction('VERIFY_EMAIL')
export const VerifyEmailSuccess = defineAction('VERIFY_EMAIL_SUCCESS')
export const VerifyEmailFailed = defineAction('VERIFY_EMAIL_FAILED')

export const GetWatchlist = defineAction('GET_WATCHLIST_REQUEST')
export const GetWatchlistSuccess = defineAction('GET_WATCHLIST_SUCCESS')
export const GetWatchlistFailed = defineAction('GET_WATCHLIST_FAILED')

export const RefreshToken = defineAction('REFRESH_TOKEN_REQUEST')
export const RefreshTokenSuccess = defineAction('REFRESH_TOKEN_SUCCESS')
export const RefreshTokenFailed = defineAction('REFRESH_TOKEN_FAILED')

export const SignOut = defineAction('SIGNOUT_REQUEST')

export const EmptyAction = defineAction('EMPTY_ACTION')
