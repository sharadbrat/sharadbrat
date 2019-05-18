import * as firebase from 'firebase';

import { CachedService } from './CachedService';
import { FirebaseService } from './FirebaseService';
import { DemoModel } from '../util';

export abstract class DemoService {

  public static getDemosCached = CachedService.cachedRequest(DemoService.getDemos);

  public static getDemos(): Promise<DemoModel[]> {
    return FirebaseService.getFirestore()
      .collection('demos').orderBy('timestamp', 'desc').get()
      .then(querySnapshot => DemoService.mapDemos(querySnapshot));
  }

  private static mapDemos(querySnapshot: firebase.firestore.QuerySnapshot): DemoModel[] {
    return querySnapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        timestamp: data.timestamp.toMillis(),
        url: data.projectUrl,
      };
    });
  }
}
