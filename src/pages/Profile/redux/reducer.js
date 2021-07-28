import {
  GetProfile,
  GetProfileFailed,
  GetProfileSuccess,
  ResetReducer
} from 'pages/SignIn/redux/actions'
import {
  GetCollectionDetail,
  GetCollectionDetailFailed,
  GetCollectionDetailSuccess,
  GetCollections,
  GetCollectionsFailed,
  GetCollectionsSuccess,
  GetFollowerSuccess,
  GetFollowingSuccess,
  GetHistory,
  GetHistoryFailed,
  GetHistorySuccess,
  GetRecipeOfUser,
  GetRecipeOfUserFailed,
  GetRecipeOfUserSuccess
} from './actions'
const initialState = {
  collections: [],
  historyList: [],
  collectionDetail: {},
  recipes: [],
  followers: [],
  following: [],
  isLoadingCollections: false,
  isLoadingCollectionDetail: false,
  isLoadingRecipe: false,
  userProfile: null,
  isLoadingProfile: false,
  isLoadingHistory: false
}

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GetHistory.type:
      return {
        ...state,
        isLoadingHistory: true
      }
    case GetHistorySuccess.type:
      return {
        ...state,
        historyList:
          action.payload && action?.payload?.length > 0 ? action.payload : [],
        isLoadingHistory: false
      }
    case GetHistoryFailed.type:
      return {
        ...state,
        isLoadingHistory: false
      }
    case GetCollections.type:
      return {
        ...state,
        isLoadingCollections: true
      }
    case GetCollectionsSuccess.type:
      return {
        ...state,
        collections: action.payload,
        isLoadingCollections: false
      }
    case GetCollectionsFailed.type:
      return {
        ...state,
        isLoadingCollections: false
      }
    case GetCollectionDetail.type:
      return {
        ...state,
        isLoadingCollectionDetail: true
      }
    case GetCollectionDetailSuccess.type:
      return {
        ...state,
        collectionDetail: action.payload,
        isLoadingCollectionDetail: false
      }
    case GetCollectionDetailFailed.type:
      return {
        ...state,
        isLoadingCollectionDetail: false
      }
    case GetFollowingSuccess.type:
      return {
        ...state,
        following:
          action.payload?.data && action.payload?.data?.length > 0
            ? action.payload?.data
            : []
      }
    case GetFollowerSuccess.type:
      return {
        ...state,
        followers:
          action.payload?.data && action.payload?.data?.length > 0
            ? action.payload?.data
            : []
      }
    case GetRecipeOfUser.type:
      return {
        ...state,
        isLoadingRecipe: true
      }
    case GetRecipeOfUserSuccess.type:
      return {
        ...state,
        recipes: action.payload,
        isLoadingRecipe: false
      }
    case GetRecipeOfUserFailed.type:
      return {
        ...state,
        isLoadingRecipe: false
      }
    case GetProfile.type:
      return { ...state, isLoadingProfile: true }
    case GetProfileSuccess.type:
      return {
        ...state,
        userProfile: action.payload,
        isLoadingProfile: false
      }
    case GetProfileFailed.type:
      return { ...state, isLoadingProfile: false }
    case ResetReducer.type:
      return initialState
    default:
      return state
  }
}
