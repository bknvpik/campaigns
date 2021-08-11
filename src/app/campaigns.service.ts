import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Campaign } from './models/Campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private campaignsCollection!: AngularFirestoreCollection<Campaign>;
  campaign$: Observable<Campaign[]>;
  private campaignDoc!: AngularFirestoreDocument<Campaign>;
  constructor(private afs: AngularFirestore) {
    this.campaignsCollection = afs.collection<Campaign>('campaigns');
    this.campaign$ = this.campaignsCollection.valueChanges({ idField: 'customID' });
    this.campaignDoc
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.campaign$;
  }

  createCampaign(campaign: Campaign): void {
    this.campaignsCollection.add(campaign);
  }

  deleteCampaign(id: string): void {
    this.campaignDoc = this.afs.doc(`campaigns/${id}`);
    this.campaignDoc.delete();
  }

  modifyCampaign(id: string, campaign: Campaign) {

  }
}