import { Component, Input, OnInit } from '@angular/core';
import { Campaign } from '../models/Campaign';

@Component({
  selector: 'campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  @Input() campaign!: Campaign;
  constructor() { }

  ngOnInit(): void {
  }

}
