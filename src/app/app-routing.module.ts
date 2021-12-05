import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FbAdSetsComponent } from './components/adsets/fb-ad-sets/fb-ad-sets.component';
import { FbAdCampaignsComponent } from './components/campaigns/fb-ad-campaigns/fb-ad-campaigns.component';

const routes: Routes = [
  { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
  { path: 'campaigns', component: FbAdCampaignsComponent },
  { path: 'adsets', component: FbAdSetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
