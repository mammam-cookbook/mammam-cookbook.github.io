import { SignOut } from 'pages/SignIn/redux/actions'
import {
  GetHomeCourse,
  GetHomeCourseFailed,
  GetHomeCourseSuccess,
  SearchCourse,
  SearchCourseFailed,
  SearchCourseSuccess
} from './actions'
const initialState = {
  isLoading: false,
  trending: [],
  mostBuy: [],
  newest: [],
  trendCategory: [],
  searchCourses: [],
  totalItems: 0
}

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case GetHomeCourse.type:
      return { ...state, isLoading: true }
    case GetHomeCourseSuccess.type:
      return {
        ...state,
        trending: action.payload.treding.results,
        mostBuy: action.payload.mostBuy,
        newest: action.payload.newest,
        trendCategory: action.payload.trendCategory,
        isLoading: false
      }
    case GetHomeCourseFailed.type:
      return { ...state, isLoading: false }
    case SearchCourse.type:
      return { ...state, isLoading: true }
    case SearchCourseSuccess.type:
      return {
        ...state,
        searchCourses: action.payload.results,
        totalItems: action.payload.total,
        isLoading: false
      }
    case SearchCourseFailed.type:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
