import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from './config-service';
import { StorageService } from './storage';

@Injectable()
export class WifipointsService {

  private config: any;

  constructor(
      public http: Http,
      public configService: ConfigService,
      public storageService: StorageService
    ) {
    console.log('Hello WifipointsService Provider');
    this.config = configService.getConfig();
  }

  private getAllWifipoints(): Promise<{}> { 
    return new Promise( (resolve, reject) => {
      console.log("getAllWifipoints > from storage");
      this.storageService.getAll().then(storedData => {
        if(!storedData) {
          throw new Error("There's no stored data");
        }
        resolve(storedData);
      }).catch(error => {
        console.log("getAllWifipoints > from API");
        this.http.get(this.config.mainAPIUrl + '/wifipoints')
        .map( res => res.json() )
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe( data => {
          this.storageService.saveWifipoints(data.bundle);
          resolve(data.bundle);
        });
      });
    });      
  }

  getFilteredItems(searchTerms: string) {
    return new Promise( (resolve, reject) => {
      this.getAllWifipoints().then( data => {
          let filteredData = this.filterItems(data, searchTerms);
          resolve(filteredData);
        });
    });
  }

  // next step: move to API
  private filterItems(items: any, searchTerms: string) {
    searchTerms = searchTerms.toLowerCase();
    return items.filter(item => {
      let matchCase = !searchTerms || searchTerms === "" || (
        (item.ADRECA.toLowerCase().indexOf(searchTerms) > -1)
        || (item.NOM_BARRI.toLowerCase().indexOf(searchTerms) > -1)
        || (item.NOM_DISTRICTE.toLowerCase().indexOf(searchTerms) > -1)
      );
      return matchCase;
    });
  }

  public searchNearestPoints(coords:any):any {
    return new Promise( (resolve, reject) => {
      const body = {
        coords: coords
      };
      console.log("POST > searchNearestPoints > coords: ",body);
      this.http.post(
          this.config.mainAPIUrl + '/wifipoints/find-nearest',
          body
        ).map( res => res.json() )
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe( data => {
          resolve(data);
        });
    });
  }

}
