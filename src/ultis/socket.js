// import { io } from 'socket.io-client'
// import { store } from 'core/store'

// const { token, tokenExp, refreshToken, refreshTokenExp } =store.getState().Auth
// export const socket = io('http://localhost:3001', {
//   reconnectionDelay: 1000,
//   reconnection: true,
//   reconnectionAttempts: 10,
//   transports: ['websocket'],
//   agent: false,
//   upgrade: false,
//   rejectUnauthorized: false,
//   query: { token: JSON.parse(localStorage.getItem("user")).token },
// })

import io from "socket.io-client";

export const socketService = {
  connect,
};
//window.location.hostname
function connect(token) {
  return new Promise((resolve, reject) => {
    const socket = io('https://api.mammam.me', {
      query: { 'token': token },
      transports: ['websocket'],
    });
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}
