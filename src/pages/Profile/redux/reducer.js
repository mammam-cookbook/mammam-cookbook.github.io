import { ResetReducer } from 'pages/SignIn/redux/actions'
import {
  GetCollectionDetail,
  GetCollectionDetailFailed,
  GetCollectionDetailSuccess,
  GetCollections,
  GetCollectionsFailed,
  GetCollectionsSuccess,
  GetFollowerSuccess,
  GetFollowingSuccess
} from './actions'
const initialState = {
  collections: [],
  collectionDetail: {},
  followers: [],
  following: [],
  isLoadingCollections: false,
  isLoadingCollectionDetail: false
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
    case ResetReducer.type:
      return initialState
    default:
      return state
  }
}
