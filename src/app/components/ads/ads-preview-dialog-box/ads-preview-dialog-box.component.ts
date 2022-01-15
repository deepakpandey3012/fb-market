import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ads-preview-dialog-box',
  templateUrl: './ads-preview-dialog-box.component.html',
  styleUrls: ['./ads-preview-dialog-box.component.scss'],
})
export class AdsPreviewDialogBoxComponent implements AfterViewInit {
  // export class AdsPreviewDialogBoxComponent {
  local_data: any;

  ////////////////////////////////////////
  ///////////////////////////////////////
  @ViewChild('hello', { static: false }) divIFrame: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<AdsPreviewDialogBoxComponent>,
    private renderer: Renderer2,

    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
  }

  ngAfterViewInit(): void {
    this.renderer.setProperty(
      this.divIFrame.nativeElement,
      'innerHTML',
      this.local_data.source
    );
  }

  ///////////////////////////////////
  ///////////////////////////////////////

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
