import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import { WifipointsService } from '../../providers/wifipoints-service';
import { WifipointDetailPage } from '../wifipoint-detail/wifipoint-detail';

@Component({
  selector: 'page-wifipoints-list',
  templateUrl: 'wifipoints-list.html'
})
export class WifipointsListPage {

  wifiPointList: any[] = [];
  searchTerms: string = "";
  searchControl: FormControl;
  isSearching: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public wifipointsService: WifipointsService
  ) {
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WifipointsListPage');
    this.isSearching = true;
    this.getFilteredWifipoints();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.isSearching = false;
      this.getFilteredWifipoints();
    });
  }

  onSearchInput() {
    this.isSearching = true;
  }

  private getFilteredWifipoints() {
    this.wifipointsService.getFilteredItems(this.searchTerms).then( (data:any) => {
      this.isSearching = false;
      this.wifiPointList = data;
    })
  }

  goToDetailPage( wifiPoint: any ) {
    this.navCtrl.push( WifipointDetailPage, {
      wifiPoint: wifiPoint,
    });
  }
}
