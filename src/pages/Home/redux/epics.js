import GlobalModal from 'components/GlobalModal'
import { combineEpics, ofType } from 'redux-observable'
import { catchError, exhaustMap, map } from 'rxjs/operators'
import { request } from 'ultis/api'
import {
  GetHomeCourse,
  GetHomeCourseFailed,
  GetHomeCourseSuccess,
  SearchCourse,
  SearchCourseFailed,
  SearchCourseSuccess
} from './actions'

const searchCourseEpic$ = action$ =>
  action$.pipe(
    ofType(SearchCourse.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'course',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return SearchCourseSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return SearchCourseFailed.get(result)
        }),
        catchError(error => {
          return SearchCourseFailed.get(error)
        })
      )
    })
  )

const getHomeEpic$ = action$ =>
  action$.pipe(
    ofType(GetHomeCourse.type),
    exhaustMap(action => {
      return request({
        method: 'GET',
        url: 'course/home',
        param: action.payload
      }).pipe(
        map(result => {
          if (result.status === 200) {
            return GetHomeCourseSuccess.get(result.data)
          }
          GlobalModal.alertMessage('Information', result.data?.message)
          return GetHomeCourseFailed.get(result)
        }),
        catchError(error => {
          return GetHomeCourseFailed.get(error)
        })
      )
    })
  )

export const homeEpics = combineEpics(searchCourseEpic$, getHomeEpic$)
