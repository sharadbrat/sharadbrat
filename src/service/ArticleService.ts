import * as firebase from 'firebase';

import { FirebaseService } from './FirebaseService';
import { CachedService } from './CachedService';
import { BlogArticleModel } from '../util';

export abstract class ArticleService {

  // PUBLIC SECTION

  public static getArticlePreviewsCached = CachedService.cachedRequest(ArticleService.getArticlePreviews);

  public static getArticlesCached = () => CachedService.cachedRequest(ArticleService.getArticles);

  public static getArticlePreviews(): Promise<BlogArticleModel[]> {
    return FirebaseService.getFirestore()
      .collection('articles')
      .orderBy('timestamp', 'desc')
      .get()
      .then((querySnapshot) => ArticleService.mapArticles(querySnapshot));
  }

  public static getArticles(): Promise<BlogArticleModel[]> {
    // todo: add implementation
    return ArticleService.getArticlePreviews();
  }

  // PRIVATE SECTION

  private static mapArticles(querySnapshot: firebase.firestore.QuerySnapshot): BlogArticleModel[] {
    return querySnapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        file: data.file,
        timestamp: data.timestamp.toMillis(),
      };
    });
  }

}
