import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CampaignsService } from '../campaigns.service';
import { Campaign } from '../models/Campaign';

@Component({
  selector: 'create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

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

  @Input() towns!: string[];
  @Input() balance!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly campaignService: CampaignsService
  ) {}

  createKeyword(name?: string): FormArray {
    return this.fb.array([name]);
  }

  addKeyword() {
    const keywords = this.createForm.get('keywords') as FormArray;
    keywords.push(this.createKeyword(this.createForm.value.keyword));
    this.createForm.get('keyword')?.reset('');
  }
  onSubmit() {
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

  ngOnInit(): void {

    this.createForm = this.fb.group({
      name: this.fb.control(''),
      keyword: '',
      keywords: this.fb.array([]),
      details: this.fb.group({
        bid: 100,
        fund: 0,
        status: false,
        town: 'Cracow',
        radius: 0
      })
    })
    this.createForm.valueChanges.subscribe(console.log);
  }

}
