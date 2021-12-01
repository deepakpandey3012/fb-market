import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  getDefaultCampaignsUrl = 'http://3.135.233.196/api/campaign/';
  postDefaultCampaignsUrl = 'http://3.135.233.196/api/campaign/';
  sendCredentialsUrl = 'http://3.135.233.196/api/accountSecrets';
  constructor(private http: HttpClient) {}

  getDefaultCampaigns(dateRange: string[], preSet) {
    if (dateRange.length != 0 && !preSet) {
      return this.http.get(
        `${this.getDefaultCampaignsUrl}?time_range={"since":"${dateRange[0]}","until":"${dateRange[1]}"}`
      );
    } else if (dateRange.length == 0 && preSet) {
      return this.http.get(
        `${this.getDefaultCampaignsUrl}?date_preset=${preSet}`
      );
    } else if (dateRange.length != 0 && preSet) {
      return this.http.get(
        `${this.getDefaultCampaignsUrl}?date_preset=${preSet}&time_range={"since":"${dateRange[0]}","until":"${dateRange[1]}"}`
      );
    }
    return this.http.get(`${this.getDefaultCampaignsUrl}`);
  }

  createCampaign(data) {
    return this.http.post(this.postDefaultCampaignsUrl, data);
  }

  sendCredentials(data) {
    return this.http.post(this.sendCredentialsUrl, data);
  }
}
