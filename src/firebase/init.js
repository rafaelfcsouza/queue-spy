import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyDzzBbZbBBXq0AZl9twRFJndCnfDFLZcO8',
  authDomain: 'queue-spy.firebaseapp.com',
  databaseURL: 'https://queue-spy.firebaseio.com',
  projectId: 'queue-spy',
  storageBucket: 'queue-spy.appspot.com',
  messagingSenderId: '941694789278'
}

firebase.initializeApp(config)
