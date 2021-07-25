import GlobalModal from 'components/GlobalModal'
import { PROFILE_PAGE } from 'pages/Profile/constant'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { history, MODAL_TYPE } from 'ultis/functions'
import i18n from 'ultis/i18n'
import {
  CreateRecipe,
  CreateRecipeFailed,
  CreateRecipeSuccess,
  SaveDraft,
  SaveDraftFailed,
  SaveDraftSuccess,
  SearchIngredient,
  SearchIngredientFailed,
  SearchIngredientSuccess
} from './actions'

const searchIngredientEpic$ = action$ =>
  action$.pipe(
    ofType(SearchIngredient.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'ingredient',
        param: { search: action.payload.search }
      }).pipe(
        map(result => {
          if (result.status === 200) {
            action.payload.onSuccess(result?.data?.data)
            return SearchIngredientSuccess.get(result?.data?.data)
          }
          return SearchIngredientFailed.get(result)
        }),
        catchError(error => {
          return SearchIngredientFailed.get(error)
        })
      )
    })
  )

const createRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(CreateRecipe.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'recipe',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              i18n.t('notification.createRecipeSuccess'),
              MODAL_TYPE.NORMAL,
              () => history.replace(`/recipe/${result.data.recipe.id}`)
            )
            return CreateRecipeSuccess.get(result.data)
          }
          GlobalModal.alertMessage()
          return CreateRecipeFailed.get(result)
        }),
        catchError(error => {
          GlobalModal.alertMessage()
          return CreateRecipeFailed.get(error)
        })
      )
    })
  )

const saveDraftEpic$ = action$ =>
  action$.pipe(
    ofType(SaveDraft.type),
    exhaustMap(action => {
      return request({
        method: 'POST',
        url: 'recipe/draft',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            GlobalModal.alertMessage(
              i18n.t('common.information'),
              i18n.t('notification.saveDraftSuccess'),
              MODAL_TYPE.NORMAL,
              () => history.replace(`/profile?page=${PROFILE_PAGE.RECIPE}`)
            )
            return SaveDraftSuccess.get(result.data)
          }
          GlobalModal.alertMessage()
          return SaveDraftFailed.get(result)
        }),
        catchError(error => {
          GlobalModal.alertMessage()
          return SaveDraftFailed.get(error)
        })
      )
    })
  )

export const createEpics = combineEpics(
  searchIngredientEpic$,
  createRecipeEpic$,
  saveDraftEpic$
)
