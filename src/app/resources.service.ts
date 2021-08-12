import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Resource } from './models/Resource';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private resourcesCollection!: AngularFirestoreCollection<Resource>;
  resources: Observable<Resource[]>;
  private resourcesnDoc!: AngularFirestoreDocument<Resource>;

  constructor(private afs: AngularFirestore) {
    this.resourcesCollection = afs.collection<Resource>('resources');
    this.resources = this.resourcesCollection.valueChanges({ idField: 'customID' });
  }

  getResources(): Observable<Resource[]> {
    return this.resources;
  }

  updateBalance(id: string, newBalance: number): void {
    this.resourcesnDoc = this.afs.doc(`resources/${id}`);
    this.resourcesnDoc.update({balance: newBalance});
  }

}
