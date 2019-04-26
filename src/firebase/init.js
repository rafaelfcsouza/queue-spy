import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyBcdlSDaM6I33KSgMWH4vCsEkh82lHHuN8',
  authDomain: 'queue-spy-project.firebaseapp.com',
  databaseURL: 'https://queue-spy-project.firebaseio.com',
  projectId: 'queue-spy-project',
  storageBucket: 'queue-spy-project.appspot.com',
  messagingSenderId: '309420530713'
}

firebase.initializeApp(config)
