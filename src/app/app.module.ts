import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { WifipointsListPage } from '../pages/wifipoints-list/wifipoints-list';
import { WifipointDetailPage } from '../pages/wifipoint-detail/wifipoint-detail';
import { TabsPage } from '../pages/tabs/tabs';

import { OrderByPipe } from '../pipes/order-by';

import { ConfigService } from '../providers/config-service';
import { WifipointsService } from '../providers/wifipoints-service';

import { Storage } from '@ionic/storage';
import { StorageService } from '../providers/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WifipointsListPage,
    WifipointDetailPage,
    TabsPage,
    OrderByPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    WifipointsListPage,
    WifipointDetailPage,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    Storage,
    StorageService,
    ConfigService,
    WifipointsService
  ]
})
export class AppModule {}
