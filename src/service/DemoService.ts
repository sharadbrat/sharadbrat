import * as firebase from 'firebase';

import { CachedService } from './CachedService';
import { FirebaseService } from './FirebaseService';
import { DemoModel } from '../util';

export abstract class DemoService {

  public static getDemosCached = () => CachedService.cachedRequest(DemoService.getDemosPreviews);

  public static getDemosPreviews(): Promise<DemoModel[]> {
    return FirebaseService.getFirestore().collection("demos").get()
      .then((querySnapshot: firebase.firestore.QuerySnapshot) => {
        return DemoService.mapDemos(querySnapshot);
      });
  }

  private static mapDemos(querySnapshot: firebase.firestore.QuerySnapshot): DemoModel[] {
    return [];
  }
}
