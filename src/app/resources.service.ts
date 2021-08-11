import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Resource } from './models/Resource';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  private resourcesCollection!: AngularFirestoreCollection<Resource>;
  resource$: Observable<Resource[]>;

  constructor(private afs: AngularFirestore) {
    this.resourcesCollection = afs.collection<Resource>('resources');
    this.resource$ = this.resourcesCollection.valueChanges();
  }

  getResources() {
    return this.resource$;
  }

}
