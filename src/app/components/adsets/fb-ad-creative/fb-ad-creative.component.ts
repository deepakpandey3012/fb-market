import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CampaignService } from 'src/app/campaign.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdCreativeDialogBoxComponent } from '../../ads/ad-creative-dialog-box/ad-creative-dialog-box.component';

@Component({
  selector: 'app-fb-ad-creative',
  templateUrl: './fb-ad-creative.component.html',
  styleUrls: ['./fb-ad-creative.component.scss']
})
export class FbAdCreativesComponent implements OnInit {
  displayedColumns: string[] = 
  ['name', 'message', 'image', 'action'];
  isVerified: boolean = false;

  adCreatives: any;
  totalAdCreativeCount: number = 0;
  contentLoading: boolean = false;
  adsetId: string;

  @ViewChild(MatTable, { static: true })table!: MatTable<any>;

  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private campaignService: CampaignService,
    private router: ActivatedRoute) {}

  ngOnInit(){
    this.adsetId = this.router.snapshot.params['id'];
    this.getAdCreatives();
  }

  getAdCreatives(){
    this.contentLoading = true;
    this.campaignService.getAdCreativeByAdsetId(this.adsetId).subscribe(result=>{
      this.adCreatives = result;
      this.totalAdCreativeCount = this.adCreatives.length;
      this.contentLoading = false;
    });
  }

  openAdCreativeEditDialog(action:any, obj:any) {
    obj.action = action;
    const adCreativeDialogRef = this.dialog.open(AdCreativeDialogBoxComponent, {
      width: '460px',
      data:obj
    });

    adCreativeDialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Update'){
        this.updateAdCreative(result);
      }
    });
  }

  updateAdCreative(creative_result){
    let row_obj = creative_result.data;
    let action = row_obj.action;
    delete row_obj.action;

    console.log(row_obj);
    this.contentLoading = true;
    this.campaignService.updateCreative(row_obj).subscribe(result=>{
      if(result){
        console.log(result);
        this.campaignService.openSnackBar('Ad Creative updated successfully.');
        this.getAdCreatives();
      }
    });
  }

}
