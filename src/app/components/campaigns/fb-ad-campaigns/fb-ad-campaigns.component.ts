import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CampaignDialogBoxComponent } from '../campaign-dialog-box/campaign-dialog-box.component';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CampaignService } from 'src/app/campaign.service';
import { AdSetDialogBoxComponent } from '../../adsets/adset-dialog-box/adset-dialog-box.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export interface campaignData {
  id: String;
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

@Component({
  selector: 'app-fb-ad-campaigns',
  templateUrl: './fb-ad-campaigns.component.html',
  styleUrls: ['./fb-ad-campaigns.component.scss'],
})
export class FbAdCampaignsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'objective', 'action'];
  preset: string;
  dateRange: string[] = [];

  campaigns: any;
  totalCampaignsCount: number = 0;

  contentLoading: boolean = false;

  preSets = [
    { value: 'today' },
    { value: 'yesterday' },
    { value: 'this_month' },
    { value: 'last_month' },
    { value: 'this_quarter' },
    { value: 'maximum' },
    { value: 'last_3d' },
    { value: 'last_7d' },
    { value: 'last_14d' },
    { value: 'last_28d' },
    { value: 'last_30d' },
    { value: 'last_90d' },
    { value: 'last_quarter' },
    { value: 'last_year' },
    { value: 'this_week_mon_today' },
    { value: 'this_week_sun_today' },
    { value: 'this_year' },
  ];

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.subscription = this.campaignService.currentVerification.subscribe(data => {
    //   // this.getCampaigns();
    //   if(data){
    //     this.getCampaigns();
    //   }else{
    //   this.router.navigate(['/']);
    //   }
    // });
    this.getCampaigns();
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  getCampaigns() {
    this.contentLoading = true;
    this.campaignService
      .getDefaultCampaigns(this.dateRange, this.preset)
      .subscribe((result) => {
        this.campaigns = result;
        this.totalCampaignsCount = this.campaigns.length;
        this.contentLoading = false;
      });
  }

  onDateChange(event: any): void {
    this.range.value.date = event;
    console.log(this.range.value.start);
    const startDate = moment(this.range.value.start, 'MM-DD-YYYY').format(
      'YYYY-MM-DD'
    );
    const endDate = moment(this.range.value.end, 'MM-DD-YYYY').format(
      'YYYY-MM-DD'
    );
    this.dateRange.push(startDate);
    this.dateRange.push(endDate);
    this.getCampaigns();
  }

  onPresetchange(event) {
    if (event.isUserInput) {
      this.preset = event.source.value;
      this.getCampaigns();
    }
  }

  openCampaignDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(CampaignDialogBoxComponent, {
      width: '460px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Add') {
        this.addCampaign(result);
      } else if (result.event == 'Update') {
        this.updateCampaign(result);
      }
    });
  }

  updateCampaign(campaign_result) {
    let row_obj = campaign_result.data;
    delete row_obj.action;
    row_obj = {
      ...row_obj,
      [row_obj.campaign_budget_label]: row_obj.campaign_budget_amount,
    };
    delete row_obj.campaign_budget_label;
    delete row_obj.campaign_budget_amount;

    this.campaignService.updateCampaign(row_obj).subscribe((result) => {
      if (result) {
        this.campaignService.openSnackBar('Ad Campaign updated successfully.');
        this.getCampaigns();
      }
    });
  }

  addCampaign(campaign_result) {
    let row_obj = campaign_result.data;
    delete row_obj.action;
    row_obj = {
      ...row_obj,
      [row_obj.campaign_budget_label]: row_obj.campaign_budget_amount,
    };
    delete row_obj.campaign_budget_label;
    delete row_obj.campaign_budget_amount;

    console.log(row_obj);
    this.campaignService.createCampaign(row_obj).subscribe((result) => {
      if (result) {
        this.campaignService.openSnackBar('Ad Campaign added successfully.');
        this.getCampaigns();
        this.openAdSetDialog(campaign_result.event, {}, result['id']);
      }
    });
  }

  openAdSetDialog(action: any, obj: any, campaignId: string) {
    obj.action = action;
    obj.campaign_id = campaignId;
    const adSetDialogRef = this.dialog.open(AdSetDialogBoxComponent, {
      width: '460px',
      data: obj,
    });

    adSetDialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Add') {
        this.addAdSet(result);
      }
      // else if(result.event == 'Update'){
      //   this.updateRowData(result.data);
      // }
    });
  }

  addAdSet(adset_result) {
    let row_obj = adset_result.data;
    delete row_obj.action;
    row_obj = {
      ...row_obj,
      [row_obj.adset_budget_label]: row_obj.adset_budget_amount,
    };
    delete row_obj.adset_budget_label;
    delete row_obj.adset_budget_amount;

    console.log(row_obj);

    this.campaignService.createAdSet(row_obj).subscribe((result) => {
      if (result) {
        this.campaignService.openSnackBar('Ad Sets added successfully.');
        console.log(result);
      }
    });
  }
}
