import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignsService } from '../campaigns.service';
import { Campaign } from '../models/Campaign';
import { Resource } from '../models/Resource';
import { ResourcesService } from '../resources.service';

@Component({
  selector: 'create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  @Input() towns!: string[];

  balance!: number;
  resources!: any;
  createForm!: FormGroup;

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
    private readonly campaignService: CampaignsService,
    private readonly resourcesService: ResourcesService,
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

  onSubmit(): void {
    const {name, keywords, details} = this.createForm.value;
    this.campaign.name = name;
    const destructed: string[] = [];
    keywords.forEach((element: string[]) => {
      destructed.push(element[0])
    });
    this.campaign.keywords = destructed;
    this.campaign.details = details;
    console.log('submitted!');
    console.log(this.campaign);
    this.campaignService.createCampaign(this.campaign);
  }

  onTypeBalance() {
    const currentFund = this.createForm.value.details.fund;
    console.log(currentFund);
    currentFund > this.balance ? this.createForm.setErrors({'invalid': true}) : null
  }

  ngOnInit(): void {
    this.resourcesService.getResources().subscribe(resources => {
      this.resources = resources[0];
      this.balance = this.resources.balance;
    });
    this.createForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      keyword: '',
      keywords: this.fb.array([], Validators.required),
      details: this.fb.group({
        bid: this.fb.control(100, Validators.compose([Validators.required, Validators.min(100)])),
        fund: this.fb.control(0, Validators.required),
        status: this.fb.control(false, Validators.required),
        town: 'Cracow',
        radius: this.fb.control(0, Validators.required)
      })
    })
    this.createForm.valueChanges.subscribe(console.log);
  }
}
