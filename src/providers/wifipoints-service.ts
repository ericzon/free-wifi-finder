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
      public configService: ConfigService
    ) {
    console.log('Hello WifipointsService Provider');
    this.config = configService.getConfig();
  }

  getAll() {
    return new Promise( (resolve, reject) => {
      this.http.get(this.config.mainAPIUrl + '/wifipoints')
        .map( res => res.json() )
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe( data => {
          resolve(data);
        });
    } ); 
  }

}
