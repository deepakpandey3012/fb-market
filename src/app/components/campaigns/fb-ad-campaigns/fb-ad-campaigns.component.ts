import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CampaignDialogBoxComponent } from '../campaign-dialog-box/campaign-dialog-box.component';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CampaignService } from 'src/app/campaign.service';
import { AdSetDialogBoxComponent } from '../../adsets/adset-dialog-box/adset-dialog-box.component';
import { Subscription } from 'rxjs';

export interface campaignData {
  id: number;
  name: string;
  status: string;
  objective: string;
}

export interface AddcampaignData {
  name: string;
  objective: string;
  special_ad_categories: string[];
  campaign_budget_optimization: boolean;
  campaign_budget_label: string;
  campaign_budget_amount: number;
  bid_strategy: string;
}

export interface AddAdsetData {
  campaign_id: string;
  name: string;
  bid_amount: number;
  adset_budget_label: string;
  adset_budget_amount: number;
  is_dynamic_creative: boolean;
  billing_event: string;
  optimization_goal: string;
  start_time: number;
  end_time: number;
  age_min: number; 
  age_max: number;
  genders: number;
  device_platforms: string[]; 
  // publisher_platforms: string[]; 
  countries: string[]; 
}

export class credentialsModel {
  access_token: string;
  account_id: string;
}

@Component({
  selector: 'app-fb-ad-campaigns',
  templateUrl: './fb-ad-campaigns.component.html',
  styleUrls: ['./fb-ad-campaigns.component.scss'],
})
export class FbAdCampaignsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'status', 'objective', 'action'];
  preset: string;
  dateRange: string[] = [];
  isVerified: boolean = false;

  campaigns: any;
  totalCampaignsCount: number = 0;

  contentLoading: boolean = false;

  preSets = [
    {value: 'today'},
    {value: 'yesterday'},
    {value: 'this_month'},
    {value: 'last_month'},
    {value: 'this_quarter'},
    {value: 'maximum'},
    {value: 'last_3d'},
    {value: 'last_7d'},
    {value: 'last_14d'},
    {value: 'last_28d'},
    {value: 'last_30d'},
    {value: 'last_90d'},
    {value: 'last_quarter'},
    {value: 'last_year'},
    {value: 'this_week_mon_today'},
    {value: 'this_week_sun_today'},
    {value: 'this_year'},
  ];

  tempVerified = true;

  @ViewChild(MatTable, { static: true })table!: MatTable<any>;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  verified: boolean;
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private campaignService: CampaignService) {}

  ngOnInit(){
    this.subscription = this.campaignService.currentVerification.subscribe(data => this.verified = data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCampaigns(){
    this.campaignService.getDefaultCampaigns(this.dateRange, this.preset).subscribe(result=>{
      this.campaigns = result;
      this.totalCampaignsCount = this.campaigns.length;
      this.contentLoading = false;
    });
  }

  onAuthSubmit(data){
    if(data.token && data.id){
      const credential = new credentialsModel();
      credential.access_token = data.token;
      credential.account_id = data.id;
      this.campaignService.sendCredentials(credential).subscribe(result=>{
        if(result){
          this.isVerified = true;
          this.contentLoading = true;
          this.campaignService.changeVerification(true);
          this.getCampaigns();
        }
      });
    }
  }

  onDateChange(event: any): void {
    this.range.value.date = event;
    console.log(this.range.value.start);
    const startDate = moment(this.range.value.start, 'MM-DD-YYYY').format('YYYY-MM-DD');
    const endDate = moment(this.range.value.end, 'MM-DD-YYYY').format('YYYY-MM-DD');
    this.dateRange.push(startDate);
    this.dateRange.push(endDate);
    this.getCampaigns();
  }

  onPresetchange(event){
    if(event.isUserInput) {
      this.preset = event.source.value;
      this.getCampaigns();
    }
  }

  
  openAdSet(element){
    console.log(element);
  }

  openCampaignDialog(action: any,obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(CampaignDialogBoxComponent, {
      width: '460px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addCampaign(result);
      }
      // else if(result.event == 'Update'){
      //   this.updateRowData(result.data);
      // }
    });
  }

  addCampaign(campaign_result){
    let row_obj = campaign_result.data;
    delete row_obj.action;
    row_obj = {
      ...row_obj,
      [row_obj.campaign_budget_label]: row_obj.campaign_budget_amount
    }
    delete row_obj.campaign_budget_label;
    delete row_obj.campaign_budget_amount;

    this.campaignService.createCampaign(row_obj).subscribe(result=>{
      if(result){
        console.log(result['id']);
        this.getCampaigns();
        this.openAdSetDialog(campaign_result.event, {}, result['id']);
      }
    });
  }

  openAdSetDialog(action:any, obj:any, campaignId:string) {
    obj.action = action;
    obj.campaign_id = campaignId;
    const adSetDialogRef = this.dialog.open(AdSetDialogBoxComponent, {
      width: '460px',
      data:obj
    });

    adSetDialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addAdSet(result);
      }
      // else if(result.event == 'Update'){
      //   this.updateRowData(result.data);
      // }
    });
  }

  addAdSet(adset_result){
    let row_obj = adset_result.data;
    delete row_obj.action;
    row_obj = {
      ...row_obj,
      [row_obj.adset_budget_label]: row_obj.adset_budget_amount
    }
    delete row_obj.adset_budget_label;
    delete row_obj.adset_budget_amount;

    console.log(row_obj);

    this.campaignService.createAdSet(row_obj).subscribe(result=>{
      if(result){
        console.log(result);
      }
    });
  }

  // updateRowData(row_obj: any){
  //   this.dataSource = this.dataSource.filter((value,key)=>{
  //     if(value.id == row_obj.id){
  //       value.name = row_obj.name;
  //     }
  //     return true;
  //   });
  // }
}
