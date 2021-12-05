import {  AfterViewInit, Component, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';


export interface AddAdsetData {
  campaign_id: string;
  name: string;
  bid_amount: number;
  adset_budget_label: string;
  adset_budget_amount: number;
  is_dynamic_creative: boolean;
  billing_event: string;
  optimization_goal: string;
  start_time: number;
  end_time: number;
  age_min: number; 
  age_max: number;
  genders: number;
  device_platforms: string[]; 
  // publisher_platforms: string[]; 
  countries: string[]; 
}


@Component({
  selector: 'app-adset-dialog-box',
  templateUrl: './adset-dialog-box.component.html',
  styleUrls: ['./adset-dialog-box.component.scss']
})
// export class AdSetDialogBoxComponent implements OnInit{
export class AdSetDialogBoxComponent {

  action:string;
  local_data:any;

  // adSetBudgetLabel: string = 'daily_budget';
  // adSetBudgetAmount: number = 1;
  adSetgendertLabel: number = 0;
  age_max: number = 65;
  age_min: number = 18;

  bidAmount : number;

  adSetBudgetLabels = [
    {value: 'daily_budget'},
    {value: 'lifetime_budget'},
  ];

  adSetgendertLabels = [
    {DisplayName:'All', value: 0},
    {DisplayName:'Male', value: 1},
    {DisplayName:'Female', value: 2}
  ];

  optimizationGoals = [
    {value: 'APP_INSTALLS'},
    {value: 'AD_RECALL_LIFT'},
    {value: 'ENGAGED_USERS'},
    {value: 'EVENT_RESPONSES'},
    {value: 'IMPRESSIONS'},
    {value: 'LEAD_GENERATION'},
    {value: 'QUALITY_LEAD'},
    {value: 'LINK_CLICKS'},
    {value: 'OFFSITE_CONVERSIONS'},
    {value: 'PAGE_LIKES'},
    {value: 'POST_ENGAGEMENT'},
    {value: 'QUALITY_CALL'},
    {value: 'REACH'},
    {value: 'LANDING_PAGE_VIEWS'},
    {value: 'VISIT_INSTAGRAM_PROFILE'},
    {value: 'VALUE'},
    {value: 'THRUPLAY'},
    {value: 'DERIVED_EVENTS'},
    {value: 'APP_INSTALLS_AND_OFFSITE_CONVERSIONS'},
    {value: 'CONVERSATIONS'},
    {value: 'IN_APP_VALUE'},
  ];

  billingEvents = [
    {value: 'APP_INSTALLS'},
    {value: 'CLICKS'},
    {value: 'IMPRESSIONS'},
    {value: 'LINK_CLICKS'},
    {value: 'OFFER_CLAIMS'},
    {value: 'PAGE_LIKES'},
    {value: 'POST_ENGAGEMENT'},
    {value: 'THRUPLAY'},
    {value: 'PURCHASE'},
    {value: 'LISTING_INTERACTION'},
  ];

  
  countries = [
    { Displayname: 'Afghanistan', value: 'AF' },
    { Displayname: 'Albania', value: 'AL' },
    { Displayname: 'Algeria', value: 'DZ' },
    { Displayname: 'American Samoa', value: 'AS' },
    { Displayname: 'Andorra', value: 'AD' },
    { Displayname: 'Angola', value: 'AO' },
    { Displayname: 'Anguilla', value: 'AI' },
    { Displayname: 'Antarctica', value: 'AQ' },
    { Displayname: 'Antigua and Barbuda', value: 'AG' },
    { Displayname: 'Argentina', value: 'AR' },
    { Displayname: 'Armenia', value: 'AM' },
    { Displayname: 'Aruba', value: 'AW' },
    { Displayname: 'Australia', value: 'AU' },
    { Displayname: 'Austria', value: 'AT' },
    { Displayname: 'Azerbaijan', value: 'AZ' },
    { Displayname: 'Bahamas (the)', value: 'BS' },
    { Displayname: 'Bahrain', value: 'BH' },
    { Displayname: 'Bangladesh', value: 'BD' },
    { Displayname: 'Barbados', value: 'BB' },
    { Displayname: 'Belarus', value: 'BY' },
    { Displayname: 'Belgium', value: 'BE' },
    { Displayname: 'Belize', value: 'BZ' },
    { Displayname: 'Benin', value: 'BJ' },
    { Displayname: 'Bermuda', value: 'BM' },
    { Displayname: 'Bhutan', value: 'BT' },
    { Displayname: 'Bolivia (Plurinational State of)', value: 'BO' },
    { Displayname: 'Bonaire, Sint Eustatius and Saba', value: 'BQ' },
    { Displayname: 'Bosnia and Herzegovina', value: 'BA' },
    { Displayname: 'Botswana', value: 'BW' },
    { Displayname: 'Bouvet Island', value: 'BV' },
    { Displayname: 'Brazil', value: 'BR' },
    { Displayname: 'British Indian Ocean Territory (the)', value: 'IO' },
    { Displayname: 'Brunei Darussalam', value: 'BN' },
    { Displayname: 'Bulgaria', value: 'BG' },
    { Displayname: 'Burkina Faso', value: 'BF' },
    { Displayname: 'Burundi', value: 'BI' },
    { Displayname: 'Cabo Verde', value: 'CV' },
    { Displayname: 'Cambodia', value: 'KH' },
    { Displayname: 'Cameroon', value: 'CM' },
    { Displayname: 'Canada', value: 'CA' },
    { Displayname: 'Cayman Islands (the)', value: 'KY' },
    { Displayname: 'Central African Republic (the)', value: 'CF' },
    { Displayname: 'Chad', value: 'TD' },
    { Displayname: 'Chile', value: 'CL' },
    { Displayname: 'China', value: 'CN' },
    { Displayname: 'Christmas Island', value: 'CX' },
    { Displayname: 'Cocos (Keeling) Islands (the)', value: 'CC' },
    { Displayname: 'Colombia', value: 'CO' },
    { Displayname: 'Comoros (the)', value: 'KM' },
    {
      Displayname: 'Congo (the Democratic Republic of the)',
      value: 'CD'
    },
    { Displayname: 'Congo (the)', value: 'CG' },
    { Displayname: 'Cook Islands (the)', value: 'CK' },
    { Displayname: 'Costa Rica', value: 'CR' },
    { Displayname: 'Croatia', value: 'HR' },
    { Displayname: 'Cuba', value: 'CU' },
    { Displayname: 'Curaçao', value: 'CW' },
    { Displayname: 'Cyprus', value: 'CY' },
    { Displayname: 'Czechia', value: 'CZ' },
    { Displayname: "Côte d'Ivoire", value: 'CI' },
    { Displayname: 'Denmark', value: 'DK' },
    { Displayname: 'Djibouti', value: 'DJ' },
    { Displayname: 'Dominica', value: 'DM' },
    { Displayname: 'Dominican Republic (the)', value: 'DO' },
    { Displayname: 'Ecuador', value: 'EC' },
    { Displayname: 'Egypt', value: 'EG' },
    { Displayname: 'El Salvador', value: 'SV' },
    { Displayname: 'Equatorial Guinea', value: 'GQ' },
    { Displayname: 'Eritrea', value: 'ER' },
    { Displayname: 'Estonia', value: 'EE' },
    { Displayname: 'Eswatini', value: 'SZ' },
    { Displayname: 'Ethiopia', value: 'ET' },
    { Displayname: 'Falkland Islands (the) [Malvinas]', value: 'FK' },
    { Displayname: 'Faroe Islands (the)', value: 'FO' },
    { Displayname: 'Fiji', value: 'FJ' },
    { Displayname: 'Finland', value: 'FI' },
    { Displayname: 'France', value: 'FR' },
    { Displayname: 'French Guiana', value: 'GF' },
    { Displayname: 'French Polynesia', value: 'PF' },
    { Displayname: 'French Southern Territories (the)', value: 'TF' },
    { Displayname: 'Gabon', value: 'GA' },
    { Displayname: 'Gambia (the)', value: 'GM' },
    { Displayname: 'Georgia', value: 'GE' },
    { Displayname: 'Germany', value: 'DE' },
    { Displayname: 'Ghana', value: 'GH' },
    { Displayname: 'Gibraltar', value: 'GI' },
    { Displayname: 'Greece', value: 'GR' },
    { Displayname: 'Greenland', value: 'GL' },
    { Displayname: 'Grenada', value: 'GD' },
    { Displayname: 'Guadeloupe', value: 'GP' },
    { Displayname: 'Guam', value: 'GU' },
    { Displayname: 'Guatemala', value: 'GT' },
    { Displayname: 'Guernsey', value: 'GG' },
    { Displayname: 'Guinea', value: 'GN' },
    { Displayname: 'Guinea-Bissau', value: 'GW' },
    { Displayname: 'Guyana', value: 'GY' },
    { Displayname: 'Haiti', value: 'HT' },
    { Displayname: 'Heard Island and McDonald Islands', value: 'HM' },
    { Displayname: 'Holy See (the)', value: 'VA' },
    { Displayname: 'Honduras', value: 'HN' },
    { Displayname: 'Hong Kong', value: 'HK' },
    { Displayname: 'Hungary', value: 'HU' },
    { Displayname: 'Iceland', value: 'IS' },
    { Displayname: 'India', value: 'IN' },
    { Displayname: 'Indonesia', value: 'ID' },
    { Displayname: 'Iran (Islamic Republic of)', value: 'IR' },
    { Displayname: 'Iraq', value: 'IQ' },
    { Displayname: 'Ireland', value: 'IE' },
    { Displayname: 'Isle of Man', value: 'IM' },
    { Displayname: 'Israel', value: 'IL' },
    { Displayname: 'Italy', value: 'IT' },
    { Displayname: 'Jamaica', value: 'JM' },
    { Displayname: 'Japan', value: 'JP' },
    { Displayname: 'Jersey', value: 'JE' },
    { Displayname: 'Jordan', value: 'JO' },
    { Displayname: 'Kazakhstan', value: 'KZ' },
    { Displayname: 'Kenya', value: 'KE' },
    { Displayname: 'Kiribati', value: 'KI' },
    {
      Displayname: "Korea (the Democratic People's Republic of)",
      value: 'KP'
    },
    { Displayname: 'Korea (the Republic of)', value: 'KR' },
    { Displayname: 'Kuwait', value: 'KW' },
    { Displayname: 'Kyrgyzstan', value: 'KG' },
    {
      Displayname: "Lao People's Democratic Republic (the)",
      value: 'LA'
    },
    { Displayname: 'Latvia', value: 'LV' },
    { Displayname: 'Lebanon', value: 'LB' },
    { Displayname: 'Lesotho', value: 'LS' },
    { Displayname: 'Liberia', value: 'LR' },
    { Displayname: 'Libya', value: 'LY' },
    { Displayname: 'Liechtenstein', value: 'LI' },
    { Displayname: 'Lithuania', value: 'LT' },
    { Displayname: 'Luxembourg', value: 'LU' },
    { Displayname: 'Macao', value: 'MO' },
    { Displayname: 'Madagascar', value: 'MG' },
    { Displayname: 'Malawi', value: 'MW' },
    { Displayname: 'Malaysia', value: 'MY' },
    { Displayname: 'Maldives', value: 'MV' },
    { Displayname: 'Mali', value: 'ML' },
    { Displayname: 'Malta', value: 'MT' },
    { Displayname: 'Marshall Islands (the)', value: 'MH' },
    { Displayname: 'Martinique', value: 'MQ' },
    { Displayname: 'Mauritania', value: 'MR' },
    { Displayname: 'Mauritius', value: 'MU' },
    { Displayname: 'Mayotte', value: 'YT' },
    { Displayname: 'Mexico', value: 'MX' },
    { Displayname: 'Micronesia (Federated States of)', value: 'FM' },
    { Displayname: 'Moldova (the Republic of)', value: 'MD' },
    { Displayname: 'Monaco', value: 'MC' },
    { Displayname: 'Mongolia', value: 'MN' },
    { Displayname: 'Montenegro', value: 'ME' },
    { Displayname: 'Montserrat', value: 'MS' },
    { Displayname: 'Morocco', value: 'MA' },
    { Displayname: 'Mozambique', value: 'MZ' },
    { Displayname: 'Myanmar', value: 'MM' },
    { Displayname: 'Namibia', value: 'NA' },
    { Displayname: 'Nauru', value: 'NR' },
    { Displayname: 'Nepal', value: 'NP' },
    { Displayname: 'Netherlands (the)', value: 'NL' },
    { Displayname: 'New Caledonia', value: 'NC' },
    { Displayname: 'New Zealand', value: 'NZ' },
    { Displayname: 'Nicaragua', value: 'NI' },
    { Displayname: 'Niger (the)', value: 'NE' },
    { Displayname: 'Nigeria', value: 'NG' },
    { Displayname: 'Niue', value: 'NU' },
    { Displayname: 'Norfolk Island', value: 'NF' },
    { Displayname: 'Northern Mariana Islands (the)', value: 'MP' },
    { Displayname: 'Norway', value: 'NO' },
    { Displayname: 'Oman', value: 'OM' },
    { Displayname: 'Pakistan', value: 'PK' },
    { Displayname: 'Palau', value: 'PW' },
    { Displayname: 'Palestine, State of', value: 'PS' },
    { Displayname: 'Panama', value: 'PA' },
    { Displayname: 'Papua New Guinea', value: 'PG' },
    { Displayname: 'Paraguay', value: 'PY' },
    { Displayname: 'Peru', value: 'PE' },
    { Displayname: 'Philippines (the)', value: 'PH' },
    { Displayname: 'Pitcairn', value: 'PN' },
    { Displayname: 'Poland', value: 'PL' },
    { Displayname: 'Portugal', value: 'PT' },
    { Displayname: 'Puerto Rico', value: 'PR' },
    { Displayname: 'Qatar', value: 'QA' },
    { Displayname: 'Republic of North Macedonia', value: 'MK' },
    { Displayname: 'Romania', value: 'RO' },
    { Displayname: 'Russian Federation (the)', value: 'RU' },
    { Displayname: 'Rwanda', value: 'RW' },
    { Displayname: 'Réunion', value: 'RE' },
    { Displayname: 'Saint Barthélemy', value: 'BL' },
    {
      Displayname: 'Saint Helena, Ascension and Tristan da Cunha',
      value: 'SH'
    },
    { Displayname: 'Saint Kitts and Nevis', value: 'KN' },
    { Displayname: 'Saint Lucia', value: 'LC' },
    { Displayname: 'Saint Martin (French part)', value: 'MF' },
    { Displayname: 'Saint Pierre and Miquelon', value: 'PM' },
    { Displayname: 'Saint Vincent and the Grenadines', value: 'VC' },
    { Displayname: 'Samoa', value: 'WS' },
    { Displayname: 'San Marino', value: 'SM' },
    { Displayname: 'Sao Tome and Principe', value: 'ST' },
    { Displayname: 'Saudi Arabia', value: 'SA' },
    { Displayname: 'Senegal', value: 'SN' },
    { Displayname: 'Serbia', value: 'RS' },
    { Displayname: 'Seychelles', value: 'SC' },
    { Displayname: 'Sierra Leone', value: 'SL' },
    { Displayname: 'Singapore', value: 'SG' }
  ];
  


  devicePlatforms = [
    {value: 'desktop'},
    {value: 'mobile'},
  ];

  // publisherPlatforms = [
  //   {value: 'facebook'},
  //   {value: 'audience_network'},
  //   {value: 'instagram'},
  //   {value: 'messenger'},
  // ];

  target_countries = new FormControl();
  target_device = new FormControl();
  target_publisher = new FormControl();

  bidStrategy: string;
  selecteddevicePlatform = [];
  selectedpublisherPlatform: [];
  selectedBillingEvent: string;
  selectedCountry = [];
  selectedOptimizationGoal: string;
  isDynamicCreativeChecked: boolean = false;
  startDate: number;
  endDate: number;



  ////////////////////////////////////////
  ///////////////////////////////////////


  constructor(
    public dialogRef: MatDialogRef<AdSetDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ///////////////////////////////////
  ///////////////////////////////////////

  doAction(){
    if(this.local_data.name){
      // this.local_data.adset_budget_label = this.adSetBudgetLabel;
      // this.local_data.adset_budget_amount = this.adSetBudgetAmount*100;
      this.local_data.is_dynamic_creative = this.isDynamicCreativeChecked;
      this.local_data.optimization_goal = this.selectedOptimizationGoal;
      this.local_data.billing_event = this.selectedBillingEvent;
      this.local_data.bid_amount = this.bidAmount? this.bidAmount*100: undefined;
      this.local_data.start_time = this.startDate;
      this.local_data.end_time = this.endDate;
      this.local_data.age_min = this.age_min;
      this.local_data.age_max = this.age_max;
      this.local_data.genders = this.adSetgendertLabel;
      this.local_data.countries = this.selectedCountry;
      this.local_data.device_platforms = this.selecteddevicePlatform;
      // this.local_data.publisher_platforms = this.selectedpublisherPlatform;

      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  }

  startDateEvent(type: string, dinput: MatDatepickerInputEvent<Date>) {
    this.startDate = Date.parse(`${dinput.value}`)/1000;
  }

  endDateEvent(type: string, dinput: MatDatepickerInputEvent<Date>) {
    this.endDate = Date.parse(`${dinput.value}`)/1000;
  }

  dynamicCreativeToggle(event: MatSlideToggleChange) {
    this.isDynamicCreativeChecked = event.checked;
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
