import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CampaignService } from 'src/app/campaign.service';
import { Subscription } from 'rxjs';
import { AdsDialogBoxComponent } from '../../ads/ads-dialog-box/ads-dialog-box.component';
import { AdCreativeDialogBoxComponent } from '../../ads/ad-creative-dialog-box/ad-creative-dialog-box.component';

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
}

@Component({
  selector: 'app-fb-ad-sets',
  templateUrl: './fb-ad-sets.component.html',
  styleUrls: ['./fb-ad-sets.component.scss']
})
export class FbAdSetsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'status', 'campaign_name', 'billing_event', 'action'];
  preset: string;
  dateRange: string[] = [];
  isVerified: boolean = false;

  adSets: any;
  totaladSetsCount: number = 0;

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

  
  tempVerified = false;
  @ViewChild(MatTable, { static: true })table!: MatTable<any>;
  @Input() datas: string;
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
    this.getAdsets();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAdsets(){
    this.campaignService.getDefaultAdSets(this.dateRange, this.preset).subscribe(result=>{
      this.adSets = result;
      this.totaladSetsCount = this.adSets.length;
    });
  }

  onDateChange(event: any): void {
    this.range.value.date = event;
    console.log(this.range.value.start);
    const startDate = moment(this.range.value.start, 'MM-DD-YYYY').format('YYYY-MM-DD');
    const endDate = moment(this.range.value.end, 'MM-DD-YYYY').format('YYYY-MM-DD');
    this.dateRange.push(startDate);
    this.dateRange.push(endDate);
    this.getAdsets();
  }

  onPresetchange(event){
    if(event.isUserInput) {
      this.preset = event.source.value;
      this.getAdsets();
    }
  }

  openAdCreativeDialog(action:any, obj:any) {
    let adsetId = obj.id;
    if(action == 'Add'){
      obj = {};
    }
    obj.action = action;
    const adCreativeDialogRef = this.dialog.open(AdCreativeDialogBoxComponent, {
      width: '460px',
      data:obj
    });

    adCreativeDialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        result.data.adset_id = adsetId;
        this.addAdCreative(result);
      }
      // else if(result.event == 'Update'){
      //   this.updateRowData(result.data);
      // }
    });
  }

  addAdCreative(creative_result){
    let row_obj = creative_result.data;
    let action = row_obj.action;
    delete row_obj.action;


    this.campaignService.createCreative(row_obj).subscribe(result=>{
      if(result){
        row_obj.creativeId = result['id'];
        this.openAdsDialog(action, row_obj);
      }
    });
  }

  openAdsDialog(action:any, obj:any) {
    let creativeId = obj.creativeId;
    let adsetId = obj.adset_id;
    if(action == 'Add'){
      obj = {};
    }
    obj.adSetId = adsetId;
    obj.adCreativeId = creativeId;
    obj.action = action;
    const adsDialogRef = this.dialog.open(AdsDialogBoxComponent, {
      width: '460px',
      data:obj
    });

    adsDialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        // console.log(result, 'from ads');
        this.addAds(result);
      }
      // else if(result.event == 'Update'){
      //   this.updateRowData(result.data);
      // }
    });
  }

  addAds(creative_result){
    let row_obj = creative_result.data;
    let action = row_obj.action;
    delete row_obj.action;

    this.campaignService.createAd(row_obj).subscribe(result=>{
      if(result){
        console.log(result, 'ok');
      }
    });
  }

}
