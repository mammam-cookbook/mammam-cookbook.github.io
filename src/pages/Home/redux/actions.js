import { defineAction } from 'redux-typed-actions'

export const SearchCourse = defineAction('SEARCH_COURSE_REQUEST')
export const SearchCourseSuccess = defineAction('SEARCH_COURSE_SUCCESS')
export const SearchCourseFailed = defineAction('SEARCH_COURSE_FAILED')

export const GetHomeCourse = defineAction('GET_HOME_COURSE_REQUEST')
export const GetHomeCourseSuccess = defineAction('GET_HOME_COURSE_SUCCESS')
export const GetHomeCourseFailed = defineAction('GET_HOME_COURSE_FAILED')
