import axios from 'axios'
import { store } from 'core/store'
import { from } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { DOMAIN, log as SysLog } from 'ultis/functions'

export function request(param) {
  let url = `${DOMAIN}/${param.url}`

  const language = store.getState().Auth.language || 'vi'
  const parameters = param.param
  const { token } = store.getState().Auth
  const headers = token
    ? {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'Access-Control-Allow-Origin': true,
        'Accept-Language': language,
        Authorization: token
      }
    : {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'Access-Control-Allow-Origin': true,
        'Accept-Language': language
      }

  return from(
    axios
      .request({
        url,
        timeout: 15000,
        headers,
        method: param.method || 'POST',
        data: parameters,
        ...(param.method === 'GET'
          ? { params: parameters, data: {} }
          : { data: parameters })
      })
      .catch(error => {
        return Promise.resolve(error.response)
      })
  ).pipe(
    map(result => {
      return result
    }),
    tap(result => log(url, parameters, result))
  )
}

function log(url, parameters, result) {
  SysLog(
    '--------------------------\n',
    // '\x1b[34m',
    'Request data:',
    // '\x1b[37m',
    '\nURL:           ',
    // '\x1b[32m',
    url,
    // '\x1b[37m',
    '\nParam:         ',
    // '\x1b[32m',
    JSON.stringify(parameters, null, '\x1b[32m'),
    // '\x1b[37m',
    '\nResponse Data: ',
    // '\x1b[32m',
    JSON.stringify(result, null, '\x1b[32m') || true,
    // '\x1b[37m',
    '\n--------------------------'
  )
}
