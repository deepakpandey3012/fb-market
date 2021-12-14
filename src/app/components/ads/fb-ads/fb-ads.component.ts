import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CampaignService } from 'src/app/campaign.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  selector: 'app-fb-ads',
  templateUrl: './fb-ads.component.html',
  styleUrls: ['./fb-ads.component.scss']
})
export class FbAdsComponent implements OnInit {
  displayedColumns: string[] = 
  ['name', 'status', 'adset_name', 'adcreative_name', 'bid_amount', 'attribution_setting', 'reach',
    'spend', 'frequency', 'created_time', 'updated_time'];
  preset: string;
  dateRange: string[] = [];
  isVerified: boolean = false;

  ads: any;
  totalAdsCount: number = 0;
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

  @ViewChild(MatTable, { static: true })table!: MatTable<any>;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private campaignService: CampaignService,
    private router: Router) {}

  ngOnInit(){
    this.subscription = this.campaignService.currentVerification.subscribe(data => {
      if(data){
        this.getAds();
      }else{
      this.router.navigate(['/']);
      }
    });
  }

  getAds(){
    this.contentLoading = true;
    this.campaignService.getAllAds(this.dateRange, this.preset).subscribe(result=>{
      this.ads = result;
      this.totalAdsCount = this.ads.length;
      this.contentLoading = false;
    });
  }

  onDateChange(event: any): void {
    this.range.value.date = event;
    console.log(this.range.value.start);
    const startDate = moment(this.range.value.start, 'MM-DD-YYYY').format('YYYY-MM-DD');
    const endDate = moment(this.range.value.end, 'MM-DD-YYYY').format('YYYY-MM-DD');
    this.dateRange.push(startDate);
    this.dateRange.push(endDate);
    this.getAds();
  }

  onPresetchange(event){
    if(event.isUserInput) {
      this.preset = event.source.value;
      this.getAds();
    }
  }

}
