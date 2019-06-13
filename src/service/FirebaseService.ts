import * as firebase from 'firebase';

export abstract class FirebaseService {

  private static db: firebase.firestore.Firestore;
  private static app: firebase.app.App;

  private static initialize() {
    FirebaseService.app = firebase.initializeApp({
      apiKey: 'AIzaSyAhSH9g-5Cjp9Hoq6diXKyDq0m5iGsZXhU',
      authDomain: "sharadbrat-blog.firebaseapp.com",
      databaseURL: "https://sharadbrat-blog.firebaseio.com",
      projectId: "sharadbrat-blog",
      storageBucket: "sharadbrat-blog.appspot.com",
      messagingSenderId: "988163163517",
      keepSynced: false,
    });

    FirebaseService.db = FirebaseService.app.firestore();
  }

  public static getFirestore(): firebase.firestore.Firestore {
    if (!FirebaseService.app) {
      FirebaseService.initialize();
    }

    return FirebaseService.db;
  }

}