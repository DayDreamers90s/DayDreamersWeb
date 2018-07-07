import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CardcategoriesPage } from '../admin/cardcategories/cardcategories';
import { CardlevelsPage } from '../admin/cardlevels/cardlevels';
import { FeedPage } from '../feed/feed';
import { GamePage } from '../game/game';

export interface PageInterface {
  title: string;
  pageName: any;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-side-menu',
  templateUrl: 'side-menu.html',
})
export class SideMenuPage {

  rootPage = TabsPage;
  @ViewChild(Nav) nav: Nav;
  pages: PageInterface[] = [
    { title: 'Home', pageName: FeedPage, tabComponent: 'FeedPage', index: 0, icon: 'home' },
    { title: 'Game', pageName: GamePage, tabComponent: 'GamePage', index: 1, icon: 'game-controller-b' },
    { title: 'Categories', pageName: CardcategoriesPage, icon: 'list-box' },
    { title: 'Card Levels', pageName: CardlevelsPage, icon: 'podium' }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    }
    //when moving from and to non-tabs pages
    else if(this.nav.getActiveChildNavs().length ==0 && page.index != undefined){
      this.nav.setRoot(TabsPage, params);
    }
     else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName.name, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root.name === page.tabComponent) {
        return 'primary';
      }
      return;
    }
  
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName.name) {
      return 'primary';
    }
    return;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SideMenuPage');
  }

}
