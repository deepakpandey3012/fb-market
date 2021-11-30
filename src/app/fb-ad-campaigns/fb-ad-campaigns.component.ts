import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CampaignDialogBoxComponent } from '../campaign-dialog-box/campaign-dialog-box.component';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CampaignService } from '../campaign.service';

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

export class credentialsModel {
  access_token: string;
  account_id: string;
}


@Component({
  selector: 'app-fb-ad-campaigns',
  templateUrl: './fb-ad-campaigns.component.html',
  styleUrls: ['./fb-ad-campaigns.component.scss'],
})
export class FbAdCampaignsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'objective'];
  preset: string;
  dateRange: string[] = [];
  isVerified: boolean = false;

  campaigns: any;
  totalCampaignsCount: number = 0;

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
  }

  getCampaigns(){
    this.campaignService.getDefaultCampaigns(this.dateRange, this.preset).subscribe(result=>{
      this.campaigns = result;
      this.totalCampaignsCount = this.campaigns.length;
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
          this.getCampaigns();
        }
      });
    }
  }

  onDateChange(event: any): void {
    this.range.value.date = event;
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

  openDialog(action: any,obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(CampaignDialogBoxComponent, {
      width: '460px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addCampaign(result.data);
      }
      // else if(result.event == 'Update'){
      //   this.updateRowData(result.data);
      // }
    });
  }

  addCampaign(row_obj){
    delete row_obj.action;
    row_obj = {
      ...row_obj,
      [row_obj.campaign_budget_label]: row_obj.campaign_budget_amount
    }
    delete row_obj.campaign_budget_label;
    delete row_obj.campaign_budget_amount;

    this.campaignService.createCampaign(row_obj).subscribe(result=>{
      if(result){
        this.getCampaigns();
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
