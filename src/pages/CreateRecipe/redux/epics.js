import GlobalModal from 'components/GlobalModal'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { history, MODAL_TYPE } from 'ultis/functions'
import i18n from 'ultis/i18n'
import {
  CreateRecipe,
  CreateRecipeFailed,
  CreateRecipeSuccess,
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
              'Tạo công thức thàng công',
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

export const createEpics = combineEpics(
  searchIngredientEpic$,
  createRecipeEpic$
)
