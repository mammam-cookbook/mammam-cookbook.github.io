import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import {
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
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
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

export const createEpics = combineEpics(searchIngredientEpic$)
