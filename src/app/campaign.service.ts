import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  getDefaultCampaignsUrl = "http://127.0.0.1:8000/campaign/";
  postDefaultCampaignsUrl = "http://127.0.0.1:8000/campaign/";
  sendCredentialsUrl = "http://127.0.0.1:8000/campaign/accountSecrets";
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

  createCampaign(data){
    return this.http.post(this.postDefaultCampaignsUrl, data);
 }

 sendCredentials(data){
  return this.http.post(this.sendCredentialsUrl, data);
}
}
