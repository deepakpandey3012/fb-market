import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CampaignService } from 'src/app/campaign.service';

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
  displayedColumns: string[] = ['name', 'status', 'adset_name'];
  preset: string;
  dateRange: string[] = [];
  isVerified: boolean = false;

  ads: any;
  totalAdsCount: number = 0;

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

  constructor(
    public dialog: MatDialog,
    private campaignService: CampaignService) {}

  ngOnInit(){
    this.getAdsets();
  }

  getAdsets(){
    this.campaignService.getDefaultAdSets(this.dateRange, this.preset).subscribe(result=>{
      this.ads = result;
      this.totalAdsCount = this.ads.length;
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

}