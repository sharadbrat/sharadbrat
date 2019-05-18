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
      .then(querySnapshot => ArticleService.mapArticles(querySnapshot));
  }

  public static getArticles(): Promise<BlogArticleModel[]> {
    // todo: add implementation
    return ArticleService.getArticlePreviews();
  }

  public static getArticle(id: string): Promise<BlogArticleModel> {
    return FirebaseService.getFirestore()
      .collection('articles')
      .doc(id)
      .get()
      .then(doc => ArticleService.mapArticle(doc))
      .then(article => {
        return FirebaseService.getStorage()
          .refFromURL(article.fileUrl)
          .getDownloadURL()
          .then(downloadUrl => {
            return fetch(downloadUrl, { method: 'GET' })
          })
          .then(result => result.text())
          .then(fileText => {
            article.file = fileText;
            return article;
          });
      });
  }

  // PRIVATE SECTION

  private static mapArticles(querySnapshot: firebase.firestore.QuerySnapshot): BlogArticleModel[] {
    return querySnapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        fileUrl: data.file,
        timestamp: data.timestamp.toMillis(),
      };
    });
  }

  private static mapArticle(doc: firebase.firestore.DocumentSnapshot): BlogArticleModel {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      fileUrl: data.file,
      timestamp: data.timestamp.toMillis(),
    };
  }

}
