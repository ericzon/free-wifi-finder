import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from './config-service';

@Injectable()
export class WifipointsService {

  private config: any;

  constructor(
      public http: Http,
      public configService: ConfigService,
    ) {
    console.log('Hello WifipointsService Provider');
    this.config = configService.getConfig();
  }

  getFilteredItems(searchTerms: string) {
    return new Promise( (resolve, reject) => {
      this.http.get(this.config.mainAPIUrl + '/wifipoints')
        .map( res => res.json() )
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe( data => {
          let filteredData = this.filterItems(data.bundle, searchTerms);
          resolve(filteredData);
        });
    }); 
  }

  // next step: move to API
  private filterItems(items: any[], searchTerms: string) {
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

}
