import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { WifipointsListPage } from '../pages/wifipoints-list/wifipoints-list';
import { WifipointDetailPage } from '../pages/wifipoint-detail/wifipoint-detail';
import { FindNearestPage } from '../pages/find-nearest/find-nearest';
import { TabsPage } from '../pages/tabs/tabs';

import { OrderByPipe } from '../pipes/order-by';

import { Storage } from '@ionic/storage';
import { StorageService } from '../providers/storage';
import { ConfigService } from '../providers/config-service';
import { WifipointsService } from '../providers/wifipoints-service';


import { MapService } from '../providers/map-service';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    WifipointsListPage,
    WifipointDetailPage,
    FindNearestPage,
    TabsPage,
    OrderByPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    WifipointsListPage,
    WifipointDetailPage,
    FindNearestPage,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    Storage,
    StorageService,
    ConfigService,
    WifipointsService,
    MapService
  ]
})
export class AppModule {}
