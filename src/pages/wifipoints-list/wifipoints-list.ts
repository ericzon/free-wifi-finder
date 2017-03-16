import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WifipointsService } from '../../providers/wifipoints-service';
import { WifipointDetailPage } from '../wifipoint-detail/wifipoint-detail';

@Component({
  selector: 'page-wifipoints-list',
  templateUrl: 'wifipoints-list.html'
})
export class WifipointsListPage {

  wifiPointList: any[] = [];
  listFilter: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public wifipointsService: WifipointsService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WifipointsListPage');
    this.getAllWifipoints();
  }

  private getAllWifipoints() {
    this.wifipointsService.getAll().then( (data:any) => {
      // console.log("DATA: ",data);
      this.wifiPointList = data.bundle;
    })
  }

  goToDetailPage( wifiPoint: any ) {
    this.navCtrl.push( WifipointDetailPage, {
      wifiPoint: wifiPoint,
    });
  }
}
