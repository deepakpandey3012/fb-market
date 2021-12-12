import {  AfterViewInit, Component, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ads-dialog-box',
  templateUrl: './ads-dialog-box.component.html',
  styleUrls: ['./ads-dialog-box.component.scss']
})
// export class AdSetDialogBoxComponent implements OnInit{
export class AdsDialogBoxComponent {

  action:string;
  local_data:any;

  ////////////////////////////////////////
  ///////////////////////////////////////


  constructor(
    public dialogRef: MatDialogRef<AdsDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ///////////////////////////////////
  ///////////////////////////////////////

  doAction(){
    if(this.local_data.name){
      // this.local_data.adset_budget_label = this.adSetBudgetLabel;
      // this.local_data.adset_budget_amount = this.adSetBudgetAmount*100;


      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
