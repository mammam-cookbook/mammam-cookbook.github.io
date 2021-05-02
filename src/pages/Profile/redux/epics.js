import { store } from 'core/store'
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
  DeleteRecipeInCollection,
  DeleteRecipeInCollectionFailed,
  DeleteRecipeInCollectionSuccess,
  GetCollectionDetail,
  GetCollectionDetailFailed,
  GetCollectionDetailSuccess,
  GetCollections,
  GetCollectionsFailed,
  GetCollectionsSuccess,
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
            return GetCollectionDetailSuccess.get(result?.data?.data)
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
          return UpdateCollectionFailed.get(result)
        }),
        catchError(error => {
          return UpdateCollectionFailed.get(error)
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
  updateCollectionEpic$
)
