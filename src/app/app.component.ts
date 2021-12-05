import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fb-market-ad';

  links = ['campaigns', 'adsets'];
  titles = ['Ad Campaings', 'Ad Sets'];
  activeLink = this.links[0];
  myColor = 'primary';
}
