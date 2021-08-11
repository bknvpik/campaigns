import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {

  @Input() detail!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
