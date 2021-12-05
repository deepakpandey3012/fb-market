import {  Component, Inject, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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
export class CampaignDialogBoxComponent {

  action:string;
  local_data:any;

  selectedObjective: string;

  campaignBudgetLabel: string = 'daily_budget';
  bidStrategy: string = 'LOWEST_COST_WITHOUT_CAP';
  campaignBudgetAmount: number = 1;
  spendingBudgetCapAmount: number;

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

  constructor(
    public dialogRef: MatDialogRef<CampaignDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AddcampaignData) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    if(this.selectedObjective && this.local_data.name){
      this.local_data.objective = this.selectedObjective;
      this.local_data.special_ad_categories = this.selectedSpecialCategory;
      this.local_data.campaign_budget_optimization = this.isOptimizationChecked;
      this.local_data.campaign_budget_label = this.campaignBudgetLabel;
      this.local_data.campaign_budget_amount = this.campaignBudgetAmount*100;
      this.local_data.spend_cap = this.isSpendingLimitChecked? this.spendingBudgetCapAmount*100: undefined;
      this.local_data.bid_strategy = this.bidStrategy;
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  }

  optimizationToggle(event: MatSlideToggleChange) {
    this.isOptimizationChecked = event.checked;
  }

  spendingLimitToggle(event: MatSlideToggleChange) {
    this.isSpendingLimitChecked = event.checked;
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
