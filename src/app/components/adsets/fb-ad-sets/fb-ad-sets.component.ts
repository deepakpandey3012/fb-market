import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CampaignService } from 'src/app/campaign.service';

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
export class FbAdSetsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'campaign_name', 'billing_event'];
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

}
