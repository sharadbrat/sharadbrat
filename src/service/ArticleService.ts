import * as firebase from 'firebase';

import { FirebaseService } from './FirebaseService';
import { BlogArticleModel } from '../util';

export abstract class ArticleService {

  // PUBLIC SECTION

  public static getArticles(): Promise<BlogArticleModel[]> {
    return FirebaseService.getFirestore()
      .collection('articles')
      .where('timestamp', '<=', new Date())
      .orderBy('timestamp', 'desc')
      .get()
      .then(querySnapshot => ArticleService.mapArticles(querySnapshot));
  }

  public static getArticle(id: string): Promise<BlogArticleModel> {
    return FirebaseService.getFirestore()
      .collection('articles')
      .doc(id)
      .get()
      .then(doc => ArticleService.mapArticle(doc));
  }

  // PRIVATE SECTION

  private static mapArticles(querySnapshot: firebase.firestore.QuerySnapshot): BlogArticleModel[] {
    return querySnapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        timestamp: data.timestamp.toMillis(),
        text: data.text,
      };
    });
  }

  private static mapArticle(doc: firebase.firestore.DocumentSnapshot): BlogArticleModel {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      timestamp: data.timestamp.toMillis(),
      text: data.text,
    };
  }

}
