import {  Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignService } from 'src/app/campaign.service';

export interface AddcampaignData {
  name: string;
  objective: string;
  special_ad_categories: string[];
  campaign_budget_optimization: boolean;
  campaign_budget_label: string;
  campaign_budget_amount: number;
  bid_strategy: string;
  spend_cap: number;
}


@Component({
  selector: 'app-campaign-dialog-box',
  templateUrl: './campaign-dialog-box.component.html',
  styleUrls: ['./campaign-dialog-box.component.scss']
})
export class CampaignDialogBoxComponent implements OnInit{

  action:string;
  local_data:any;

  objectives = [
    {value: 'APP_INSTALLS'},
    {value: 'BRAND_AWARENESS'},
    {value: 'CONVERSIONS'},
    {value: 'EVENT_RESPONSES'},
    {value: 'LEAD_GENERATION'},
    {value: 'LINK_CLICKS'},
    {value: 'MESSAGES'},
    {value: 'OFFER_CLAIMS'},
    {value: 'PAGE_LIKES'},
    {value: 'POST_ENGAGEMENT'},
    {value: 'PRODUCT_CATALOG_SALES'},
    {value: 'REACH'},
    {value: 'STORE_VISITS'},
    {value: 'VIDEO_VIEWS'}
  ];

  
  specialAdCategories = [
    {value: 'EMPLOYMENT'},
    {value: 'HOUSING'},
    {value: 'CREDIT'},
    {value: 'ISSUES_ELECTIONS_POLITICS'},
    {value: 'ONLINE_GAMBLING_AND_GAMING'}
  ];

  campaignBudgetLabels = [
    {value: 'daily_budget'},
    {value: 'lifetime_budget'},
  ];

  bidStrategies = [
    {value: 'LOWEST_COST_WITHOUT_CAP'},
    {value: 'COST_CAP'},
  ];

  special_Adcategories = new FormControl();
  selectedSpecialCategory = [];
  isOptimizationChecked: boolean = false;
  isSpendingLimitChecked: boolean = false;
  isStatusChecked: boolean = false;
  statusEditable: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CampaignDialogBoxComponent>,
    private campaignService: CampaignService,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AddcampaignData) {
    this.local_data = {...data};
    this.action = this.local_data.action;
    this.statusEditable = (this.local_data.status == 'ACTIVE' || this.local_data.status == 'PAUSED')? true: false;
  }

  ngOnInit(): void {
    if(this.action == 'Add'){
      this.local_data.campaign_budget_label = 'daily_budget';
      this.local_data.campaign_budget_amount = 1;
      this.local_data.bid_strategy = 'LOWEST_COST_WITHOUT_CAP';
    }else if(this.action == 'Update'){
      this.campaignService.getCampaignById(this.local_data['id']).subscribe(result=>{
        this.local_data = result;

        if(this.statusEditable){
          this.isStatusChecked = this.local_data.status == 'ACTIVE'? true: false;
        }
        this.isSpendingLimitChecked = this.local_data?.spend_cap;
        if(this.local_data.daily_budget){
          this.local_data.campaign_budget_label = 'daily_budget';
          this.local_data.campaign_budget_amount = this.local_data.daily_budget;
          this.local_data.campaign_budget_optimization = true;
        }else if(this.local_data.lifetime_budget){
          this.local_data.campaign_budget_label = 'lifetime_budget';
          this.local_data.campaign_budget_amount = this.local_data.lifetime_budget;
          this.local_data.campaign_budget_optimization = true;
        }
        
        if(this.local_data.campaign_budget_amount)
          this.local_data.campaign_budget_amount /=100;
        if(this.local_data.spend_cap)
          this.local_data.spend_cap /= 100;
      });
    }
  }

  doAction(){
    if(this.local_data.objective && this.local_data.name){
      this.local_data.campaign_budget_amount *= 100;
      this.local_data.spend_cap = this.isSpendingLimitChecked? this.local_data.spend_cap*100: undefined;
      if(this.statusEditable){
        this.local_data.status = this.isStatusChecked? 'ACTIVE': 'PAUSED';
      }
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
