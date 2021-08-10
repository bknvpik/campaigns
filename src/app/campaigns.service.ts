import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  campaigns: Observable<any[]>;
  constructor(afs: AngularFirestore) {
    this.campaigns = afs.collection('campaigns').valueChanges();
    console.log(this.campaigns);
  }

  getCampaigns() {
    return this.campaigns;
  }
}