import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs'
import { FbAdCampaignsComponent } from './components/campaigns/fb-ad-campaigns/fb-ad-campaigns.component';
import { CampaignDialogBoxComponent } from './components/campaigns/campaign-dialog-box/campaign-dialog-box.component';
import { FbAdSetsComponent } from './components/adsets/fb-ad-sets/fb-ad-sets.component';
import { AdSetDialogBoxComponent } from './components/adsets/adset-dialog-box/adset-dialog-box.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FbAdsComponent } from './components/ads/fb-ads/fb-ads.component';
import { AdsDialogBoxComponent } from './components/ads/ads-dialog-box/ads-dialog-box.component';
import { AdCreativeDialogBoxComponent } from './components/ads/ad-creative-dialog-box/ad-creative-dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    FbAdCampaignsComponent,
    CampaignDialogBoxComponent,
    FbAdSetsComponent,
    AdSetDialogBoxComponent,
    FbAdsComponent,
    AdsDialogBoxComponent,
    AdCreativeDialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule ,
    MatSelectModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatTabsModule,
    NgxMatSelectSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
