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

export const GetFollower = defineAction('GET_FOLLOWER_REQUEST')
export const GetFollowerSuccess = defineAction('GET_FOLLOWER_SUCCESS')
export const GetFollowerFailed = defineAction('GET_FOLLOWER_FAILED')

export const GetFollowing = defineAction('GET_FOLLOWING_REQUEST')
export const GetFollowingSuccess = defineAction('GET_FOLLOWING_SUCCESS')
export const GetFollowingFailed = defineAction('GET_FOLLOWING_FAILED')

export const GetRecipeOfUser = defineAction('GET_RECIPE_USER_REQUEST')
export const GetRecipeOfUserSuccess = defineAction('GET_RECIPE_USER_SUCCESS')
export const GetRecipeOfUserFailed = defineAction('GET_RECIPE_USER_FAILED')

export const FollowUser = defineAction('FOLLOW_USER_REQUEST')
export const FollowUserSuccess = defineAction('FOLLOW_USER_SUCCESS')
export const FollowUserFailed = defineAction('FOLLOW_USER_FAILED')

export const UnFollowUser = defineAction('UN_FOLLOW_USER_REQUEST')
export const UnFollowUserSuccess = defineAction('UN_FOLLOW_USER_SUCCESS')
export const UnFollowUserFailed = defineAction('UN_FOLLOW_USER_FAILED')

export const DeleteRecipe = defineAction('DELETE_RECIPE')
export const DeleteRecipeSuccess = defineAction('DELETE_RECIPE_SUCCESS')
export const DeleteRecipeFailed = defineAction('DELETE_RECIPE_FAILED')
