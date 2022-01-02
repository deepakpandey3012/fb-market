import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ad-creative-dialog-box',
  templateUrl: './ad-creative-dialog-box.component.html',
  styleUrls: ['./ad-creative-dialog-box.component.scss']
})
// export class AdSetDialogBoxComponent implements OnInit{
export class AdCreativeDialogBoxComponent implements OnInit {

  action:string;
  local_data:any;

  selectedFile;

  ////////////////////////////////////////
  ///////////////////////////////////////

  isUpdate: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AdCreativeDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ///////////////////////////////////
  ///////////////////////////////////////

  ngOnInit(): void {
    this.isUpdate = this.action == 'Update'? true: false;
    if(this.isUpdate){
      this.local_data.message = this.local_data.object_story_spec.link_data.message;
    }
  }

  doAction(){
    if(this.local_data.name){
      this.local_data.image = this.selectedFile;
      if(this.isUpdate){
        delete this.local_data.image_url;
        delete this.local_data.object_story_spec;
      }
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
      me.selectedFile = me.selectedFile.split(",")[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
