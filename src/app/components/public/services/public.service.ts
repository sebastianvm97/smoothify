import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../../../environments/environments";
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { URL } from '../../private/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);

  public async getURLData(URLId: string): Promise<URL> {
    const querySnapshot = await getDoc(doc(this.db, 'urls', URLId));

    return querySnapshot.data() as any;
  }
}
