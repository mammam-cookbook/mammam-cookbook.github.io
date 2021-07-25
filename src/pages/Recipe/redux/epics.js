import GlobalModal from 'components/GlobalModal'
import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { history, MODAL_TYPE } from 'ultis/functions'
import i18n from 'ultis/i18n'
import {
  AddToMenu,
  AddToMenuListFailed,
  AddToMenuListSuccess,
  AddToShoppingList,
  AddToShoppingListFailed,
  AddToShoppingListSuccess,
  CommentChallengeFailed,
  CommentChallengePost,
  CommentChallengeSuccess,
  CommentPost,
  CommentPostFailed,
  CommentPostSuccess,
  DeleteComment,
  DeleteCommentFailed,
  DeleteCommentSuccess,
  GetDetailRecipe,
  GetDetailRecipeFailed,
  GetDetailRecipeSuccess,
  ReactRecipe,
  ReactRecipeFailed,
  ReactRecipeSuccess,
  UpdateRecipe,
  UpdateRecipeFailed,
  UpdateRecipeSuccess,
  UpvoteComment,
  UpvoteCommentFailed,
  UpvoteCommentSuccess
} from './actions'

const commentRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(CommentPost.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'comment',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ recipeId: action.payload.recipe_id })
            )
            return CommentPostSuccess.get(result.data)
          }
          GlobalModal.alertMessage(null, result.data.err)
          return CommentPostFailed.get(result)
        }),
        catchError(error => {
          return CommentPostFailed.get(error)
        })
      )
    })
  )

const commentChallengeRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(CommentChallengePost.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'challenge',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ recipeId: action.payload.recipe_id })
            )
            return CommentChallengeSuccess.get(result.data)
          }
          GlobalModal.alertMessage(null, result.data.err)
          return CommentChallengeFailed.get(result)
        }),
        catchError(error => {
          return CommentChallengeFailed.get(error)
        })
      )
    })
  )

const getDetailRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(GetDetailRecipe.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: `recipe/${action.payload.recipeId}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetDetailRecipeSuccess.get(result.data.result)
          }
          GlobalModal.alertMessage(
            null,
            result.data.err,
            MODAL_TYPE.NORMAL,
            () => history.replace('/')
          )
          return GetDetailRecipeFailed.get(result)
        }),
        catchError(error => {
          GlobalModal.alertMessage(
            null,
            'Đã có lỗi xảy ra hoặc công thức không tồn tại. Quay về trang chủ?',
            MODAL_TYPE.NORMAL,
            () => history.replace('/')
          )
          return GetDetailRecipeFailed.get(error)
        })
      )
    })
  )

const updateRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(UpdateRecipe.type),
    exhaustMap(action => {
      return request({
        method: 'PUT',
        url: `recipe/${action.payload.recipeId}`,
        param: action.payload?.data
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              i18n.t('notification.editRecipeSuccess'),
              MODAL_TYPE.NORMAL,
              () => history.replace(`/recipe/${action.payload.recipeId}`)
            )
            return UpdateRecipeSuccess.get(result.data.result)
          }
          GlobalModal.alertMessage(null, result.data.err)
          return UpdateRecipeFailed.get(result)
        }),
        catchError(error => {
          GlobalModal.alertMessage()
          return UpdateRecipeFailed.get(error)
        })
      )
    })
  )

const addShoppingListEpic$ = action$ =>
  action$.pipe(
    ofType(AddToShoppingList.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'shopinglist',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              i18n.t('notification.addToShoppingListSuccess')
            )
            return AddToShoppingListSuccess.get(result.data)
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            i18n.t('notification.alreadyInShoppingList')
          )
          return AddToShoppingListFailed.get(result)
        }),
        catchError(error => {
          GlobalModal.alertMessage()
          return AddToShoppingListFailed.get(error)
        })
      )
    })
  )

const addMenuEpic$ = action$ =>
  action$.pipe(
    ofType(AddToMenu.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'menu',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              i18n.t('notification.addToMenuSuccess')
            )
            return AddToMenuListSuccess.get(result.data)
          }
          GlobalModal.alertMessage()
          return AddToMenuListFailed.get(result)
        }),
        catchError(error => {
          GlobalModal.alertMessage()
          return AddToMenuListFailed.get(error)
        })
      )
    })
  )

const reactRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(ReactRecipe.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'reaction',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ recipeId: action.payload.recipe_id })
            )
            return ReactRecipeSuccess.get(result.data)
          }
          GlobalModal.alertMessage()
          return ReactRecipeFailed.get(result)
        }),
        catchError(error => {
          GlobalModal.alertMessage()
          return ReactRecipeFailed.get(error)
        })
      )
    })
  )

const upvoteCommentEpic$ = action$ =>
  action$.pipe(
    ofType(UpvoteComment.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'upvote',
        param: { comment_id: action.payload?.comment_id }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ recipeId: action.payload.recipe_id })
            )
            return UpvoteCommentSuccess.get(result.data)
          }
          GlobalModal.alertMessage(null, result.data.err)
          return UpvoteCommentFailed.get(result)
        }),
        catchError(error => {
          return UpvoteCommentFailed.get(error)
        })
      )
    })
  )

const deleteCommentEpic$ = action$ =>
  action$.pipe(
    ofType(DeleteComment.type),
    exhaustMap(action => {
      return request({
        method: 'DELETE',
        url: `comment/${action.payload.commentId}`
      }).pipe(
        map(result => {
          if (result.status === 200) {
            store.dispatch(
              GetDetailRecipe.get({ recipeId: action.payload.recipeId })
            )
            return DeleteCommentSuccess.get(result.data)
          }
          GlobalModal.alertMessage()
          return DeleteCommentFailed.get(result)
        }),
        catchError(error => {
          GlobalModal.alertMessage()
          return DeleteCommentFailed.get(error)
        })
      )
    })
  )

export const recipeEpics = combineEpics(
  getDetailRecipeEpic$,
  commentRecipeEpic$,
  addShoppingListEpic$,
  addMenuEpic$,
  reactRecipeEpic$,
  commentChallengeRecipeEpic$,
  upvoteCommentEpic$,
  deleteCommentEpic$,
  updateRecipeEpic$
)
