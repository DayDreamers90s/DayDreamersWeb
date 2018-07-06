import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav  } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import { CardcategoriesPage } from '../admin/cardcategories/cardcategories';
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
    { title: 'Game', pageName: GamePage, tabComponent: 'GamePage', index: 1, icon: 'contacts' },
    { title: 'Categories', pageName: CardcategoriesPage, icon: 'shuffle' }
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
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }
 
  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SideMenuPage');
  }

}
