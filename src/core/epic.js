import { authEpics } from 'pages/SignIn/redux/epics'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics(authEpics)
