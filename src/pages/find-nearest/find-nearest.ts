import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsLatLngBounds,
          Geolocation, GoogleMapsMarker, GoogleMapsMarkerOptions, Toast } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-find-nearest',
  templateUrl: 'find-nearest.html'
})
export class FindNearestPage {

  addressStr: any = "";
  isSearching: boolean = false;
  currentLatLng: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public platform: Platform
    ) {
    platform.ready().then(() => {
      console.log("platform ready!");
      this.getCurrentPosition().then( latLng => {
        this.currentLatLng = latLng;
        console.log("getCurrentPosition successful: ",latLng);
        this.geolocate(latLng).then( address => {
          this.isSearching = false;
          console.log("GEOLOCATION successful: ",address);
          this.addressStr = address;
        });
      }).catch(error => {
        this.isSearching = false;
        console.log("Error: ",error);
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindNearestPage');
    this.isSearching = true;
  }

  geolocate(latLng) {
    return new Promise( (resolve, reject) => {
      new google.maps.Geocoder().geocode({'location':latLng}, function(results, status){
        if(status === google.maps.GeocoderStatus.OK){
          resolve(results[0].formatted_address);
        } else {
          reject();
        }    
       });
    });
  }

  getCurrentPosition() {
    return new Promise( (resolve, reject) => {
      Geolocation.getCurrentPosition({enableHighAccuracy:true, timeout:5000, maximumAge:0}).then( position => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        resolve(new GoogleMapsLatLng(lat, lng));
      });
    });
  }

  searchNearestPoints() {
    this.isSearching = true;
    //this.currentLatLng
    setTimeout(()=> {
      this.isSearching = false;
    },2000);
  }

}
