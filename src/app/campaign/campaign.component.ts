import { Component, Input, OnInit } from '@angular/core';
import { CampaignsService } from '../campaigns.service';
import { Campaign } from '../models/Campaign';
import { ResourcesService } from '../resources.service';

@Component({
  selector: 'campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  @Input() resources!: any;
  campaigns!: any[];
  editState: boolean = false;
  campaignToEdit!: any;

  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly resourcesService: ResourcesService
  ) {}

  modifyCampaign(campaign: Campaign): void {
    this.editState = true;
    this.campaignToEdit = campaign;
  }

  deleteCampaign(campaign: any): void {
    this.campaignsService.deleteCampaign(campaign.customID);
    const newBalance = this.resources.balance + campaign.details.fund;
    this.resourcesService.updateBalance(this.resources.customID, newBalance);
  }

  clearAll = (): void => {
    this.editState = false;
    this.campaignToEdit = null;
  }

  ngOnInit(): void {
      this.campaignsService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

}
