import io from 'socket.io-client'

export const socketService = {
  connect
}
function connect(token) {
  return new Promise((resolve, reject) => {
    const socket = io('https://api.mammam.me', {
      query: { token: token },
      transports: ['websocket']
    })
    socket.on('connect', () => {
      resolve(socket)
    })
  })
}
