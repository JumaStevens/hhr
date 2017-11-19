import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAZ-BFtBNXSbEVxm_JpLCG2emVV_yccMyM',
  authDomain: 'hurricane-relief.firebaseapp.com',
  databaseURL: 'https://hurricane-relief.firebaseio.com',
  projectId: 'hurricane-relief',
  storageBucket: '',
  messagingSenderId: '259124581072'
}

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
