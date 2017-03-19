import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

  private wifipointsKey = 'wifipoints';

  constructor(public storage: Storage) {
    console.log('Hello Storage Provider');
  }

  getAll() {
    return this.storage.get(this.wifipointsKey).then(data => {
      // console.log("Storage > data: ",data);
      return Promise.resolve(JSON.parse(data));
    }).catch(error => Promise.reject(error));
  }

  saveWifipoints(wp) {
    return this.storage.set(this.wifipointsKey, JSON.stringify(wp));
  }
}
