import GlobalModal from 'components/GlobalModal'
import { store } from 'core/store'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { history, MODAL_TYPE } from 'ultis/functions'
import {
  CommentPost,
  CommentPostFailed,
  CommentPostSuccess,
  GetDetailRecipe,
  GetDetailRecipeFailed,
  GetDetailRecipeSuccess
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

export const recipeEpics = combineEpics(
  getDetailRecipeEpic$,
  commentRecipeEpic$
)
