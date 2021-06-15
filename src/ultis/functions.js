import { createBrowserHistory } from 'history'
import i18n from './i18n'
import easy from 'assets/images/easy peasy.png'
import yum from 'assets/images/yum.png'
import yuck from 'assets/images/yuck.png'
import tough from 'assets/images/tough nut.png'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-199127755-2')
export const history = createBrowserHistory({ forceRefresh: true })

history.listen(window => {
  ReactGA.set({ page: window.pathname })
  ReactGA.pageview(window?.pathname + window?.search)
})

export const DOMAIN = 'http://174.138.23.100/api'
// export const DOMAIN = 'http://localhost:3001/api'
export const __DEV__ = false

export const LIMIT_ITEMS = 16
export const COLOR = {
  primary1: '#F6A13A',
  primary2: '#F38B12',
  primary3: '#ffc000',
  mainBlack: '#5C5C5C',
  gray: '#C4C4C4',
  grayText: '#828282'
}

export const NAME_REGEX =
  /^[A-Z0-9a-z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*$/

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

export const REACTION = ['easy peasy', 'yum', 'yuck', 'tough nut']
export const MENU_SESSION = ['morning', 'noon', 'night']
export const WEEK_COUNT = [0, 1, 2, 3, 4, 5, 6]
export const REACTION_IMG = {
  'easy peasy': easy,
  yum: yum,
  yuck: yuck,
  'tough nut': tough
}

export const DEFAULT_PASSWORD = '12345678'

export const getCurrentLng = () =>
  i18n.language || window.localStorage.i18nextLng || ''

export const calcCalories = (accumulator, currentValue) =>
  accumulator + currentValue.calories

export const calcCaloriesMenu = (accumulator, currentValue) =>
  accumulator + currentValue?.recipe?.ingredients?.reduce(calcCalories, 0)

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1)
}

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
