import { defineAction } from 'redux-typed-actions'

export const GetCollections = defineAction('GET_COLLECTIONS_REQUEST')
export const GetCollectionsSuccess = defineAction('GET_COLLECTIONS_SUCCESS')
export const GetCollectionsFailed = defineAction('GET_COLLECTIONS_FAILED')

export const CreateCollection = defineAction('CREATE_COLLECTION')
export const CreateCollectionSuccess = defineAction('CREATE_COLLECTION_SUCCESS')
export const CreateCollectionFailed = defineAction('CREATE_COLLECTION_FAILED')

export const GetCollectionDetail = defineAction('GET_COLLECTION_DETAIL')
export const GetCollectionDetailSuccess = defineAction(
  'GET_COLLECTION_DETAIL_SUCCESS'
)
export const GetCollectionDetailFailed = defineAction(
  'GET_COLLECTION_DETAIL_FAILED'
)

export const AddRecipeToCollection = defineAction('ADD_RECIPE_TO_COLLECTION')
export const AddRecipeToCollectionSuccess = defineAction(
  'ADD_RECIPE_TO_COLLECTION_SUCCESS'
)
export const AddRecipeToCollectionFailed = defineAction(
  'ADD_RECIPE_TO_COLLECTION_FAILED'
)

export const DeleteRecipeInCollection = defineAction(
  'DELETE_RECIPE_IN_COLLECTION'
)
export const DeleteRecipeInCollectionSuccess = defineAction(
  'DELETE_RECIPE_IN_COLLECTION_SUCCESS'
)
export const DeleteRecipeInCollectionFailed = defineAction(
  'DELETE_RECIPE_IN_COLLECTION_FAILED'
)

export const DeleteCollection = defineAction('DELETE_COLLECTION')
export const DeleteCollectionSuccess = defineAction('DELETE_COLLECTION_SUCCESS')
export const DeleteCollectionFailed = defineAction('DELETE_COLLECTION_FAILED')

export const UpdateCollection = defineAction('UPDATE_COLLECTION')
export const UpdateCollectionSuccess = defineAction('UPDATE_COLLECTION_SUCCESS')
export const UpdateCollectionFailed = defineAction('UPDATE_COLLECTION_FAILED')
