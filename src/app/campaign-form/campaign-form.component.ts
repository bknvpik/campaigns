import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignsService } from '../campaigns.service';
import { Campaign } from '../models/Campaign';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ResourcesService } from '../resources.service';

@Component({
  selector: 'campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnChanges {

  @Input() resources!: any;
  @Input() campaignToModify!: any;
  @Input() editState!: boolean;
  @Input() clearAll!: any;

  faCheck = faCheck;
  faPlus = faPlus;
  createForm!: FormGroup;
  error: string = '';

  campaign: Campaign = {
    name: '',
    keywords: [''],
    details: {
        bid: 0,
        fund: 0,
        status: false,
        town: '',
        radius: 0
    }
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly campaignsService: CampaignsService,
    private readonly resourcesService: ResourcesService
  ) {}

  createKeyword(name?: string): FormArray {
    return this.fb.array([name]);
  }

  addKeyword(): void {
    const keywords = this.createForm.get('keywords') as FormArray;
    const keyword = this.createForm.value.keyword;
    if(keyword.length) {
      keywords.push(this.createKeyword(keyword));
      this.createForm.get('keyword')?.reset('');
    }
    return;
  }

  prepareData(): void {
    const {name, keywords, details} = this.createForm.value;
    this.campaign.name = name;
    const destructed: string[] = [];
    keywords.forEach((element: string[]) => {
      destructed.push(element[0])
    });
    this.campaign.keywords = destructed;
    this.campaign.details = details;
  }

  onSubmit(): void {
    if(this.campaignToModify) {
      this.prepareData();
      if(this.resources.balance >= this.campaign.details.fund) {
        this.campaignsService.modifyCampaign(this.campaignToModify.customID, this.campaign);
        const difference = Math.abs(this.campaignToModify.details.fund - this.campaign.details.fund);
        let newBalance: number = this.resources.balance;
        if(this.campaignToModify.details.fund < this.campaign.details.fund)
          newBalance = this.resources.balance - difference;
        else
          newBalance = this.resources.balance + difference;
        this.resourcesService.updateBalance(this.resources.customID, newBalance);
        this.clearAll();
      }
      else {
        this.error = 'Not enough emeralds!';
      }
    }
    else {
      this.prepareData();
      console.log('submitted!');
      console.log(this.campaign);
      if(this.resources.balance >= this.campaign.details.fund) {
        this.campaignsService.createCampaign(this.campaign);
        const newBalance: number = this.resources.balance - this.campaign.details.fund;
        this.resourcesService.updateBalance(this.resources.customID, newBalance);
        this.createForm.reset();
      }
      else {
        this.error = 'Not enough emeralds!';
      }
    }
  }

  ngOnChanges(): void {
    console.log(this.resources.balance)
    if(this.campaignToModify) {
      this.createForm = this.fb.group({
        name: this.fb.control(this.campaignToModify.name, Validators.required),
        keyword: '',
        keywords: this.fb.array(this.campaignToModify.keywords, Validators.required),
        details: this.fb.group({
          bid: this.fb.control(this.campaignToModify.details.bid, Validators.compose([Validators.required, Validators.min(100)])),
          fund: this.fb.control(this.campaignToModify.details.fund, Validators.compose([Validators.required, Validators.min(0), Validators.max(this.resources.balance)])),
          status: this.fb.control(this.campaignToModify.details.status, Validators.required),
          town: this.fb.control(this.campaignToModify.details.town, Validators.required),
          radius: this.fb.control(this.campaignToModify.details.radius, Validators.required)
        })
      })
      this.createForm.valueChanges.subscribe(console.log);
    }
    else {
      this.createForm = this.fb.group({
        name: this.fb.control('', Validators.required),
        keyword: '',
        keywords: this.fb.array([], Validators.required),
        details: this.fb.group({
          bid: this.fb.control(100, Validators.compose([Validators.required, Validators.min(100)])),
          fund: this.fb.control(0, Validators.compose([Validators.required, Validators.min(0), Validators.max(this.resources.balance)])),
          status: this.fb.control(null, Validators.required),
          town: this.fb.control('', Validators.required),
          radius: this.fb.control(0, Validators.required)
        })
      })
      this.createForm.valueChanges.subscribe(console.log);
    }
  }
}
