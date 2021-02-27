import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { history, __DEV__ } from 'ultis/functions'
import { rootEpic } from './epic'
import { rootReducer } from './reducer'

const epicMiddleware = createEpicMiddleware()

const applyMiddlewarePro = applyMiddleware(
  epicMiddleware,
  routerMiddleware(history)
)
const applyMiddlewareDev = applyMiddleware(
  logger,
  epicMiddleware,
  routerMiddleware(history)
)

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  __DEV__ ? compose(applyMiddlewareDev) : compose(applyMiddlewarePro)
)

epicMiddleware.run(rootEpic)

export const persistor = persistStore(store)
