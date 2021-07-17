import GlobalModal from 'components/GlobalModal'
import { store } from 'core/store'
import { SearchRecipes } from 'pages/SearchRecipe/redux/actions'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import {
  AddRecipeToCollection,
  AddRecipeToCollectionFailed,
  AddRecipeToCollectionSuccess,
  CreateCollection,
  CreateCollectionFailed,
  CreateCollectionSuccess,
  DeleteCollection,
  DeleteCollectionFailed,
  DeleteCollectionSuccess,
  DeleteRecipe,
  DeleteRecipeFailed,
  DeleteRecipeInCollection,
  DeleteRecipeInCollectionFailed,
  DeleteRecipeInCollectionSuccess,
  DeleteRecipeSuccess,
  FollowUser,
  FollowUserFailed,
  FollowUserSuccess,
  GetCollectionDetail,
  GetCollectionDetailFailed,
  GetCollectionDetailSuccess,
  GetCollections,
  GetCollectionsFailed,
  GetCollectionsSuccess,
  GetFollower,
  GetFollowerFailed,
  GetFollowerSuccess,
  GetFollowing,
  GetFollowingFailed,
  GetFollowingSuccess,
  GetRecipeOfUser,
  GetRecipeOfUserFailed,
  GetRecipeOfUserSuccess,
  UnFollowUser,
  UnFollowUserFailed,
  UnFollowUserSuccess,
  UpdateCollection,
  UpdateCollectionFailed,
  UpdateCollectionSuccess
} from './actions'

const getCollectionsEpic$ = action$ =>
  action$.pipe(
    ofType(GetCollections.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'collection'
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetCollectionsSuccess.get(result?.data?.collections)
          }
          return GetCollectionsFailed.get(result)
        }),
        catchError(error => {
          return GetCollectionsFailed.get(error)
        })
      )
    })
  )

const createCollectionsEpic$ = action$ =>
  action$.pipe(
    ofType(CreateCollection.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'collection',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetCollections.get())
            return CreateCollectionSuccess.get(result?.data)
          }
          GlobalModal.alertMessage()
          return CreateCollectionFailed.get(result)
        }),
        catchError(error => {
          return CreateCollectionFailed.get(error)
        })
      )
    })
  )

const getCollectionDetailEpic$ = action$ =>
  action$.pipe(
    ofType(GetCollectionDetail.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `collection/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetCollectionDetailSuccess.get(result?.data?.collection)
          }
          return GetCollectionDetailFailed.get(result)
        }),
        catchError(error => {
          return GetCollectionDetailFailed.get(error)
        })
      )
    })
  )

const addRecipeToCollectionEpic$ = action$ =>
  action$.pipe(
    ofType(AddRecipeToCollection.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: `collection/${action.payload.collectionId}/recipe/${action.payload.recipeId}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetCollections.get())
            store.dispatch(GetCollectionDetail.get(action.payload.collectionId))
            return AddRecipeToCollectionSuccess.get(result?.data)
          }
          GlobalModal.alertMessage()
          return AddRecipeToCollectionFailed.get(result)
        }),
        catchError(error => {
          return AddRecipeToCollectionFailed.get(error)
        })
      )
    })
  )

const deleteRecipeInCollectionEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteRecipeInCollection.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `collection/${action.payload.collectionId}/recipe/${action.payload.recipeId}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetCollections.get())
            store.dispatch(GetCollectionDetail.get(action.payload.collectionId))
            return DeleteRecipeInCollectionSuccess.get(result?.data)
          }
          GlobalModal.alertMessage()
          return DeleteRecipeInCollectionFailed.get(result)
        }),
        catchError(error => {
          return DeleteRecipeInCollectionFailed.get(error)
        })
      )
    })
  )

const deleteCollectionEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteCollection.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `collection/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetCollections.get())
            return DeleteCollectionSuccess.get(result?.data)
          }
          GlobalModal.alertMessage()
          return DeleteCollectionFailed.get(result)
        }),
        catchError(error => {
          return DeleteCollectionFailed.get(error)
        })
      )
    })
  )

const updateCollectionEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateCollection.type),
    exhaustMap(action => {
      return request({
        method: 'PUT',
        url: `collection/${action.payload.collectionId}`,
        param: { name: action.payload.name }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetCollections.get())
            store.dispatch(GetCollectionDetail.get(action.payload.collectionId))
            return UpdateCollectionSuccess.get(result?.data)
          }
          GlobalModal.alertMessage()
          return UpdateCollectionFailed.get(result)
        }),
        catchError(error => {
          return UpdateCollectionFailed.get(error)
        })
      )
    })
  )

const getFollowingEpic$ = action$ =>
  action$.pipe(
    ofType(GetFollowing.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `user/${action.payload}/following`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetFollowingSuccess.get({
              userId: action.payload,
              data: result?.data?.followings
            })
          }
          return GetFollowingFailed.get(result)
        }),
        catchError(error => {
          return GetFollowingFailed.get(error)
        })
      )
    })
  )

const getFollowerEpic$ = action$ =>
  action$.pipe(
    ofType(GetFollower.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `user/${action.payload}/follower`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetFollowerSuccess.get({
              userId: action.payload,
              data: result?.data?.followers
            })
          }
          return GetFollowerFailed.get(result)
        }),
        catchError(error => {
          return GetFollowerFailed.get(error)
        })
      )
    })
  )

const followUserEpic$ = action$ =>
  action$.pipe(
    ofType(FollowUser.type),
    exhaustMap(action => {
      const user = store.getState().Auth.user
      return request({
        method: 'POST',
        url: `user/${user.id}/follow/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetFollowing.get(user.id))
            store.dispatch(GetFollower.get(user.id))
            return FollowUserSuccess.get(result?.data)
          }
          return FollowUserFailed.get(result)
        }),
        catchError(error => {
          return FollowUserFailed.get(error)
        })
      )
    })
  )

const unFollowUserEpic$ = action$ =>
  action$.pipe(
    ofType(UnFollowUser.type),
    exhaustMap(action => {
      const user = store.getState().Auth.user
      return request({
        method: 'POST',
        url: `user/${user.id}/unfollow/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetFollowing.get(user.id))
            store.dispatch(GetFollower.get(user.id))
            return UnFollowUserSuccess.get(result?.data)
          }
          return UnFollowUserFailed.get(result)
        }),
        catchError(error => {
          return UnFollowUserFailed.get(error)
        })
      )
    })
  )

const getRecipeUserEpic$ = action$ =>
  action$.pipe(
    ofType(GetRecipeOfUser.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `user/${action.payload}/recipe`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetRecipeOfUserSuccess.get(result?.data?.recipes)
          }
          return GetRecipeOfUserFailed.get(result)
        }),
        catchError(error => {
          return GetRecipeOfUserFailed.get(error)
        })
      )
    })
  )

const deleteRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteRecipe.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `recipe/${action.payload}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(GetRecipeOfUser.get(store.getState().Auth.user?.id))
            store.dispatch(SearchRecipes.get({}))
            return DeleteRecipeSuccess.get(result?.data)
          }
          GlobalModal.alertMessage()
          return DeleteRecipeFailed.get(result)
        }),
        catchError(error => {
          return DeleteRecipeFailed.get(error)
        })
      )
    })
  )

export const profileEpics = combineEpics(
  getCollectionsEpic$,
  createCollectionsEpic$,
  getCollectionDetailEpic$,
  addRecipeToCollectionEpic$,
  deleteRecipeInCollectionEpic$,
  deleteCollectionEpic$,
  updateCollectionEpic$,
  getFollowerEpic$,
  getFollowingEpic$,
  unFollowUserEpic$,
  followUserEpic$,
  getRecipeUserEpic$,
  deleteRecipeEpic$
)
