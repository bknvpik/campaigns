import { Component } from '@angular/core';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './models/Campaign';
import { Resource } from './models/Resource';
import { ResourcesService } from './resources.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "campaigns";
  campaigns: Campaign[] = [];
  resources: Resource = {
    balance: 0,
    keywords: [],
    towns: []
  };
  
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly resourcesService: ResourcesService
  ) {}

  ngOnInit() {
    this.campaignsService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
      console.log(this.campaigns);
    });
    this.resourcesService.getResources().subscribe(resources => {
      this.resources = resources[0];
      console.log(this.resources);
    });
  }

}