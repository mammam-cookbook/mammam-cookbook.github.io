import GlobalModal from 'components/GlobalModal'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import i18n from 'ultis/i18n'
import {
  GetHomeRecipe,
  GetHomeRecipeFailed,
  GetHomeRecipeSuccess
} from './actions'

const getHomeEpic$ = action$ =>
  action$.pipe(
    ofType(GetHomeRecipe.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'recipe/list',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetHomeRecipeSuccess.get({
              ...action.payload,
              data: result.data?.result
            })
          }
          GlobalModal.alertMessage(
            i18n.t('common.information'),
            result.data?.message
          )
          return GetHomeRecipeFailed.get(result)
        }),
        catchError(error => {
          return GetHomeRecipeFailed.get(error)
        })
      )
    })
  )

export const homeEpics = combineEpics(getHomeEpic$)
