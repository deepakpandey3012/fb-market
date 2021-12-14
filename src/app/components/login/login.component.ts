import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { CampaignService } from 'src/app/campaign.service';


export class credentialsModel {
  access_token: string;
  account_id: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isVerified: boolean = false;
  subscription: Subscription;
  img_path = "assets/img/verified.jpg";
  longText = `You've been verified. Go to any of the tabs from menu to get started. If you are new, start from creating campaigns from the Campaigns tab.`;
  
  constructor(
    private campaignService: CampaignService,
    private cookieService: CookieService){

   }

  ngOnInit(): void {
    this.subscription = this.campaignService.currentVerification.subscribe(data => this.isVerified = data);
  }
  
  onAuthSubmit(data){
    if(data.token && data.id){
      const credential = new credentialsModel();
      credential.access_token = data.token;
      credential.account_id = data.id;
      this.campaignService.sendCredentials(credential).subscribe(result=>{
        if(result){
          this.campaignService.changeVerification(true);
        }
      });
    }
  }

}
