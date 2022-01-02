import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'custom-location',
  templateUrl: './custom-locations.component.html',
  styleUrls: ['./custom-locations.component.scss']
})
export class CustomLocationComponent implements OnInit {

  action:string;
  local_data;

  distanceUnits = [
    {value: 'kilometer'},
    {value: 'mile'},
  ];

  ////////////////////////////////////////
  ///////////////////////////////////////

  isUpdate: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CustomLocationComponent>) {
      this.local_data = {};
      this.action = 'Add';
  }

  ///////////////////////////////////
  ///////////////////////////////////////

  ngOnInit(): void {
    
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
