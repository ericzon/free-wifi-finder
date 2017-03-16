import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

@Component({
  selector: 'page-wifipoint-detail',
  templateUrl: 'wifipoint-detail.html'
})
export class WifipointDetailPage {

  wifiPoint: any;
  map: GoogleMap;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public platform: Platform
    ) {
    this.wifiPoint = this.navParams.get('wifiPoint');
    platform.ready().then(() => {
        this.loadMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WifipointDetailPage');
  }

  loadMap() {

  console.log("LAT: ",this.wifiPoint.LATITUD);
  console.log("LNG: ",this.wifiPoint.LONGITUD);
    let location = new GoogleMapsLatLng(this.wifiPoint.LATITUD, this.wifiPoint.LONGITUD);// -34.9290,138.6010
    //let location = new GoogleMapsLatLng(-34.9290,138.6010);
 
    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
    });
  }

}
