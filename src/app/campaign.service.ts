import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {

  private verificationSource = new BehaviorSubject(false);
  currentVerification = this.verificationSource.asObservable();

  getDefaultCampaignsUrl = "http://127.0.0.1:8000/campaign/";
  getDefaultAdsetsUrl = "http://127.0.0.1:8000/adset/";
  postDefaultCampaignsUrl = "http://127.0.0.1:8000/campaign/";
  postAdsetUrl = "http://127.0.0.1:8000/adset/";
  sendCredentialsUrl = "http://127.0.0.1:8000/campaign/accountSecrets";

  postCreativeUrl = "http://127.0.0.1:8000/ads/adCreative/";
  postAdsUrl = "http://127.0.0.1:8000/ads/";

  constructor(private http: HttpClient) {   }

  getDefaultCampaigns(dateRange: string[], preSet){
    if(dateRange.length!=0 && !preSet){
      return this.http.get(`${this.getDefaultCampaignsUrl}?time_range={"since":"${dateRange[0]}","until":"${dateRange[1]}"}`);
    }else if(dateRange.length==0 && preSet){
      return this.http.get(`${this.getDefaultCampaignsUrl}?date_preset=${preSet}`);
    }else if(dateRange.length!=0 && preSet){
      return this.http.get(`${this.getDefaultCampaignsUrl}?date_preset=${preSet}&time_range={"since":"${dateRange[0]}","until":"${dateRange[1]}"}`);
    }
     return this.http.get(`${this.getDefaultCampaignsUrl}`);
  }

  getDefaultAdSets(dateRange: string[], preSet){
    if(dateRange.length!=0 && !preSet){
      return this.http.get(`${this.getDefaultAdsetsUrl}?time_range={"since":"${dateRange[0]}","until":"${dateRange[1]}"}`);
    }else if(dateRange.length==0 && preSet){
      return this.http.get(`${this.getDefaultAdsetsUrl}?date_preset=${preSet}`);
    }else if(dateRange.length!=0 && preSet){
      return this.http.get(`${this.getDefaultAdsetsUrl}?date_preset=${preSet}&time_range={"since":"${dateRange[0]}","until":"${dateRange[1]}"}`);
    }
     return this.http.get(`${this.getDefaultAdsetsUrl}`);
  }

  createCampaign(data){
    return this.http.post(this.postDefaultCampaignsUrl, data);
 }

 createAdSet(data){
  return this.http.post(this.postAdsetUrl, data);
}

 sendCredentials(data){
  return this.http.post(this.sendCredentialsUrl, data);
  }

  changeVerification(data: boolean) {
    this.verificationSource.next(data);
  }

  createCreative(data){
    return this.http.post(this.postCreativeUrl, data);
  }
}
