import { createHashHistory } from 'history'

export const history = createHashHistory({ forceRefresh: true })

export const DOMAIN = 'https://coursedo.herokuapp.com/api'
// export const DOMAIN = 'http://localhost:3001'
export const __DEV__ = false

export const LIMIT_ITEMS = 12
export const COLOR = {
  primary1: '#FF8A00',
  primary2: '#FFC000',
  mainBlack: '#5C5C5C',
  gray: '#C4C4C4'
}

export const MODAL_TYPE = {
  NORMAL: 'NORMAL',
  CHOICE: 'CHOICE'
}

export const ROLES = Object.freeze({
  STUDENT: 0,
  TEACHER: 1,
  ADMIN: 2,
  NOT_VERIFIED: 3
})

export const DEFAULT_PASSWORD = '12345678'

export function log(...arg) {
  if (__DEV__) {
    console.info(
      arg
        .map(i =>
          ['string', 'number'].indexOf(typeof i) === -1
            ? JSON.stringify(i, null, ' ')
            : i
        )
        .join(' ')
    )
  }
}
