import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import { LIMIT_ITEMS } from 'ultis/functions'
import {
  SearchRecipes,
  SearchRecipesFailed,
  SearchRecipesSuccess,
  SearchUsers,
  SearchUsersFailed,
  SearchUsersSuccess
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
              total: result?.data?.total,
              rows:
                result?.data?.result?.length > 0
                  ? result?.data?.result?.map(item =>
                      item?._source?.id
                        ? item?._source
                        : item?._source?.dataValues
                    )
                  : [],
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

const searchUserEpic$ = action$ =>
  action$.pipe(
    ofType(SearchUsers.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'user',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return SearchUsersSuccess.get({
              ...result?.data?.userlist,
              currentOffset: action.payload?.offset
            })
          }
          return SearchUsersFailed.get(result)
        }),
        catchError(error => {
          return SearchUsersFailed.get(error)
        })
      )
    })
  )

export const searchEpics = combineEpics(searchRecipeEpic$, searchUserEpic$)
