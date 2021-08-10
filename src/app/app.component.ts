import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './models/Campaign';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "campaigns";
  campaigns : Campaign[] = [];
  constructor(private campaignsService: CampaignsService) {
  }

  private _balance = 1000;
  
  get balance() {
    return this._balance;
  }

  set balance(newValue: number) {
    this.balance = newValue;
  }

  ngOnInit() {
    this.campaignsService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    })
  }
}