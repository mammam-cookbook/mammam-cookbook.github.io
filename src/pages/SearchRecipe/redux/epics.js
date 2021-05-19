import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { LIMIT_ITEMS } from 'ultis/functions'
import {
  SearchRecipes,
  SearchRecipesFailed,
  SearchRecipesSuccess
} from './actions'

const searchRecipeEpic$ = action$ =>
  action$.pipe(
    ofType(SearchRecipes.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'recipe',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return SearchRecipesSuccess.get({
              ...result?.data?.result,
              currentPage: action.payload.offset / LIMIT_ITEMS + 1
            })
          }
          return SearchRecipesFailed.get(result)
        }),
        catchError(error => {
          return SearchRecipesFailed.get(error)
        })
      )
    })
  )

export const searchEpics = combineEpics(searchRecipeEpic$)
