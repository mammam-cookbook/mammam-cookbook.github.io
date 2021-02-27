import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAtecH2-MKarHvC3Xk0dnzMwV13kjVjqeA',
  authDomain: 'mammam-4142e.firebaseapp.com',
  projectId: 'mammam-4142e',
  storageBucket: 'mammam-4142e.appspot.com',
  messagingSenderId: '135398026894',
  appId: '1:135398026894:web:5c6bfaf7d312b5a7c623df',
  measurementId: 'G-9FDRVH8EF9'
}

const MammamFirebase = !firebase.apps?.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

export default MammamFirebase
