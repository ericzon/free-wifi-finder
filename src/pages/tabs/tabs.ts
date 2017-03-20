import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { WifipointsListPage } from '../wifipoints-list/wifipoints-list';
import { FindNearestPage } from '../find-nearest/find-nearest';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = WifipointsListPage;
  tab3Root: any = FindNearestPage;

  constructor() {

  }
}
