import { createHashHistory } from 'history'

export const history = createHashHistory({ forceRefresh: true })

// export const DOMAIN = 'https://mam-staging.herokuapp.com/api'
export const DOMAIN = 'http://localhost:3001/api'
export const __DEV__ = true

export const LIMIT_ITEMS = 12
export const COLOR = {
  primary1: '#F6A13A',
  primary2: '#F38B12',
  mainBlack: '#5C5C5C',
  gray: '#C4C4C4'
}

export const MODAL_TYPE = {
  NORMAL: 'NORMAL',
  CHOICE: 'CHOICE'
}

export const ROLES = Object.freeze({
  USER: 'user',
  MOD: 'mod',
  ADMIN: 'admin'
})

export const RECIPE_STATUS = Object.freeze({
  PENDING: 'Pending',
  APPROVED: 'Approved'
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
