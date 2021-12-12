import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message = 'Hello';
  title = 'fb-market-ad';

  links = ['campaigns', 'adsets', 'ads'];
  titles = ['Ad Campaings', 'Ad Sets', 'Ads'];
  activeLink = this.links[0];
  myColor = 'primary';
}
