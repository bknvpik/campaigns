import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Resource } from './models/Resource';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private resourcesCollection!: AngularFirestoreCollection<Resource>;
  resource$: Observable<Resource[]>;
  private resourcesnDoc!: AngularFirestoreDocument<Resource>;

  constructor(private afs: AngularFirestore) {
    this.resourcesCollection = afs.collection<Resource>('resources');
    this.resource$ = this.resourcesCollection.valueChanges({ idField: 'customID' });
  }

  getResources(): Observable<Resource[]> {
    return this.resource$;
  }

  updateBalance(id: string, newBalance: number): void {
    this.resourcesnDoc = this.afs.doc(`resources/${id}`);
    this.resourcesnDoc.update({balance: newBalance});
  }

}
