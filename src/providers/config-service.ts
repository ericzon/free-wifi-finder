import { Injectable } from '@angular/core';
import config from '../config/config';

@Injectable()
export class ConfigService {
  
  private config: any;

  constructor() {
    console.log('Hello ConfigService Provider');
    this.config = config;
  }

  prueba() {
    return 1;
  }

  getConfig():any {
    return this.config;
  }

}
