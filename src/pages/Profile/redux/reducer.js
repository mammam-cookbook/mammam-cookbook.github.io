import { ResetReducer } from 'pages/SignIn/redux/actions'
import {
  GetCollectionDetail,
  GetCollectionDetailFailed,
  GetCollectionDetailSuccess,
  GetCollections,
  GetCollectionsFailed,
  GetCollectionsSuccess
} from './actions'
const initialState = {
  collections: [],
  collectionDetail: {},
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
    case ResetReducer.type:
      return initialState
    default:
      return state
  }
}
