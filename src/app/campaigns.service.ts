import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Campaign } from './models/Campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  private campaignsCollection!: AngularFirestoreCollection<Campaign>;
  campaigns: Observable<Campaign[]>;
  private campaignDoc!: AngularFirestoreDocument<Campaign>;

  constructor(
    private afs: AngularFirestore) {
    this.campaignsCollection = afs.collection<Campaign>('campaigns');
    this.campaigns = this.campaignsCollection.valueChanges({ idField: 'customID' });
  }

  getCampaigns(): Observable<Campaign[]> {
    return this.campaigns;
  }

  createCampaign(campaign: Campaign): void {
    this.campaignsCollection.add(campaign);
  }

  deleteCampaign(id: string): void {
    this.campaignDoc = this.afs.doc(`campaigns/${id}`);
    this.campaignDoc.delete();
  }

  modifyCampaign(id: string, campaign: Campaign): void {
    this.campaignDoc = this.afs.doc(`campaigns/${id}`);
    this.campaignDoc.update(campaign);
  }
  
}