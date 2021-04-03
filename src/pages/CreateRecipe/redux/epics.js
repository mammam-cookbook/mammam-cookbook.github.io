import GlobalModal from 'components/GlobalModal'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import i18n from 'ultis/i18n'
import {
  CreateRecipe,
  CreateRecipeSuccess,
  CreateRecipeFailed,
  GetCategories,
  GetCategoriesFailed,
  GetCategoriesSuccess,
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

const getCategoriesEpic$ = action$ =>
  action$.pipe(
    ofType(GetCategories.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'category'
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetCategoriesSuccess.get(
              result?.data?.categories?.categoriesResult
            )
          }
          return GetCategoriesFailed.get(result)
        }),
        catchError(error => {
          return GetCategoriesFailed.get(error)
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
              'Tạo công thức thàng công'
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

export const createEpics = combineEpics(
  searchIngredientEpic$,
  getCategoriesEpic$,
  createRecipeEpic$
)
