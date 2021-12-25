import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FbAdsComponent } from './components/ads/fb-ads/fb-ads.component';
import { FbAdCreativesComponent } from './components/adsets/fb-ad-creative/fb-ad-creative.component';
import { FbAdSetsComponent } from './components/adsets/fb-ad-sets/fb-ad-sets.component';
import { FbAdCampaignsComponent } from './components/campaigns/fb-ad-campaigns/fb-ad-campaigns.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'campaigns', component: FbAdCampaignsComponent },
  { path: 'adsets', component: FbAdSetsComponent },
  { path: 'ads', component: FbAdsComponent },
  { path: 'adCreatives/:id', component: FbAdCreativesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
