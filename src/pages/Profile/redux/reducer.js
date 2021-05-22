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
  GetRecipeOfUser,
  GetRecipeOfUserFailed,
  GetRecipeOfUserSuccess
} from './actions'
const initialState = {
  collections: [],
  collectionDetail: {},
  recipes: [],
  followers: [],
  following: [],
  isLoadingCollections: false,
  isLoadingCollectionDetail: false,
  isLoadingRecipe: false,
  userProfile: null,
  isLoadingProfile: false
}

export function profileReducer(state = initialState, action) {
  switch (action.type) {
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
          action.payload && action.payload?.length > 0 ? action.payload : []
      }
    case GetFollowerSuccess.type:
      return {
        ...state,
        followers:
          action.payload && action.payload?.length > 0 ? action.payload : []
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
