import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, 
          Geolocation, GoogleMapsMarker, GoogleMapsMarkerOptions, Toast } from 'ionic-native';

@Component({
  selector: 'page-wifipoint-detail',
  templateUrl: 'wifipoint-detail.html'
})
export class WifipointDetailPage {

  map: GoogleMap;
  wifiPoint: any;
  myLatLng: any;
  wifipointLatLng: any;
  loader: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public platform: Platform,
      public loadingCtrl: LoadingController
    ) {
    this.wifiPoint = this.navParams.get('wifiPoint');
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      //duration: 3000
    });
    this.loader.present();
    platform.ready().then(() => {
      this.getCurrentPosition();
    }).catch(error => {
      console.log("Error: ",error);
      this.loader.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WifipointDetailPage');
  }

  ionViewWillLeave() {
    console.log("ionViewDidLoad WifipointDetailPage");
    this.loader.dismiss();    
  }

  loadMap() {
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
        'latLng': this.myLatLng,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        this.loader.dismiss();
        console.log('Map is ready!');
        /*
        const currentPositionMrk = {
          coords: this.myLatLng,
          title: 'My position'
        };
        this.setMarker(currentPositionMrk);
        */
        let wifipointMrk = {
          coords: this.wifipointLatLng,
          title: 'Free Wifi!'
        };
        this.setMarker(wifipointMrk);
    });
  }

  setMarker(markerInfo){
    if(markerInfo.coords) {
      let markerOptions: GoogleMapsMarkerOptions = {
        position: markerInfo.coords,
        title: markerInfo.title
      };
      this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
      });
    } else {
      Toast.show("No se ha podido obtener la posición del marker", '5000', 'bottom').subscribe( toast => {
          console.log(toast);
      });
    }
  }

  getCurrentPosition() {
    Geolocation.getCurrentPosition().then( position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      this.myLatLng = new GoogleMapsLatLng(lat, lng);

      console.log("wifipoint coords: ",this.wifiPoint);
      this.wifipointLatLng = new GoogleMapsLatLng(this.wifiPoint.LATITUD, this.wifiPoint.LONGITUD);

      this.loadMap();
    } );
  }

}
