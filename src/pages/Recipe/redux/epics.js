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
              'Đã thêm vào danh sách mua'
            )
            return AddToShoppingListSuccess.get(result.data)
          }
          GlobalModal.alertMessage()
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
              'Đã thêm vào thực đơn'
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

export const recipeEpics = combineEpics(
  getDetailRecipeEpic$,
  commentRecipeEpic$,
  addShoppingListEpic$,
  addMenuEpic$
)
