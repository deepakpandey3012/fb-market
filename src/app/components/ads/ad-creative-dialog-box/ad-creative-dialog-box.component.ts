import {  AfterViewInit, Component, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ad-creative-dialog-box',
  templateUrl: './ad-creative-dialog-box.component.html',
  styleUrls: ['./ad-creative-dialog-box.component.scss']
})
// export class AdSetDialogBoxComponent implements OnInit{
export class AdCreativeDialogBoxComponent {

  action:string;
  local_data:any;

  selectedFile;

  ////////////////////////////////////////
  ///////////////////////////////////////


  constructor(
    public dialogRef: MatDialogRef<AdCreativeDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ///////////////////////////////////
  ///////////////////////////////////////

  doAction(){
    if(this.local_data.name && this.local_data.pageId){
      this.local_data.image = this.selectedFile;

      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  }

  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.selectedFile = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
