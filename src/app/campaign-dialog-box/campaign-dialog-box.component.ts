import {  Component, Inject, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AddcampaignData {
  name: string;
  objective: string;
  special_ad_categories: string[];
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

  special_Adcategories = new FormControl();
  selectedSpecialCategory = [];

  constructor(
    public dialogRef: MatDialogRef<CampaignDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AddcampaignData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    this.local_data.objective = this.selectedObjective;
    this.local_data.special_ad_categories = this.selectedSpecialCategory;
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
