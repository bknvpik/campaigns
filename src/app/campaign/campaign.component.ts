import { Component, Input, OnInit } from '@angular/core';
import { CampaignsService } from '../campaigns.service';
import { Campaign } from '../models/Campaign';

@Component({
  selector: 'campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  @Input() campaign!: Campaign;
  constructor(private readonly campaignService: CampaignsService) { }

  deleteCampaign(event: any, campaign: any) {
    this.campaignService.deleteCampaign(campaign.customID);
    console.log(campaign.customID);
  }

  ngOnInit(): void {
  }

}
